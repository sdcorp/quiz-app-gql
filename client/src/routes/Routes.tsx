import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROUTES } from './config'

export const Routes: React.FC = () => {
  return (
    <Switch>
      {ROUTES.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  )
}
