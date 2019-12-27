import { ApolloServer, PubSub } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import http from 'http'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { createConnection, getConnectionOptions, useContainer } from 'typeorm'
import { customAuthChecker } from './middleware/authChecker'
import { redis } from './utils/redis'

const pubSub = new PubSub()

// register 3rd party IOC container
useContainer(Container)

const startServer = async () => {
  const app = express()

  const RedisStore = connectRedis(session)

  app.set('trust proxy', 1)

  app.use(
    cors({
      credentials: true,
      origin: process.env.NODE_ENV === 'production' ? 'https://www.mysite.com' : 'http://localhost:3000',
    })
  )

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: 'qid',
    secret: 'some_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    },
  }

  app.use(session(sessionOption))

  const options = await getConnectionOptions(process.env.NODE_ENV || 'development')

  await createConnection({ ...options, name: 'default' })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/modules/**/*.resolver.ts'],
      validate: true,
      authChecker: customAuthChecker,
      container: Container,
      pubSub,
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const PORT = process.env.PORT || 4000

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀  Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
  })
}

startServer()
