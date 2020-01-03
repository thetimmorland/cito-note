import React from "react"
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

import Home from "./Home"
import Login from "./Login"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
