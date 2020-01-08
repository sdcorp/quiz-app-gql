import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ROUTES, IRoute } from './config'
import { useMeQuery } from '../generated/graphql'

// TODO handle this later
export const PrivateRoute: React.FC<IRoute> = ({ component: Component, ...rest }) => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading Route...</p>
  console.log({ data, loading })
  return (
    <Route
      {...rest}
      render={props =>
        data?.me ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  )
}

export const Routes: React.FC = () => {
  return (
    <Switch>
      {ROUTES.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  )
}
