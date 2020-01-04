import React, { useState, useEffect } from "react"
import { CssBaseline } from "@material-ui/core"

import Home from "./Home"
import Login from "./Login"

export default function App() {
  const [authToken, updateAuthToken] = useState(localStorage.getItem("authToken"))
  useEffect((AuthContext) => localStorage.setItem("authToken", authToken))

  return (
    <>
      <CssBaseline />
      {authToken ?
        <Home authToken={authToken} updateAuthToken={updateAuthToken} /> :
        <Login updateAuthToken={updateAuthToken} />}
    </>
  )
}
