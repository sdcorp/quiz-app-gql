import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './index.css'
import App from './App'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
})

const RootApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<RootApp />, document.getElementById('root'))
