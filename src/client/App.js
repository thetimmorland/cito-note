import React, { useState, useEffect } from "react"

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom"

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Toolbar,
} from "@material-ui/core"

import axios from "axios"
import jwt from "jsonwebtoken"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PrivateData path="/api/users" child={<Home />} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}


function Private({ path, child }) {

    const auth = {
        getToken: () => localStorage.getItem("autentication"),
        getId: () => jwt.decode(this.getToken()).sub,
        isAuthenticated: () => {
            try {
                jwt.decode(this.getToken())
                return true;
            } catch {
                return false;
            }
        },
    }

  const [state, updateState] = useState([])

  if (auth.isAutenticated) {
    return(
      <Child state={state} updateState={updateState} />
    )
  } else {
    return(
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )
  }
}


function Home() {
  let { path, url } = useRouteMatch()
  let history = useHistory()

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-end"
          >
            <Grid item>
              <Button
                onClick={() => {
                  localStorage.removeItem("authorization")
                  history.push("/login")
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path={path}>
          <Bookshelf />
        </Route>
        <Route exact path={`${path}/:bookId`}>
          <Editor />
        </Route>
      </Switch>
    </Router>
  )
}


function Bookshelf(props) {
  const [books, updateBooks] = useState(null)

  useEffect(() => {
    axios.get(`/api/user/${id}/book`, { headers : {
      authorization: localStorage.getItem("authorization")
    }}).then(res => {
      updateBooks(res.body)
    })
  })

  return (
    <Box m={2}>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        spacing={2}
      >
        {books ? (
          books.map(book =>
            <Grid item key={book.id}>
              <Book { ...book } />
            </Grid>
          )
        ) : (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Box>
  )

  function Book(props) {
    return (
      <Button
        variant="outlined"
        color="primary"
        fullWidth
      >
        <Grid
          container
          spacing={8}
        >
          <Grid item>
            {props.name}
          </Grid>
          <Grid item>
            {props.id}
          </Grid>
        </Grid>
      </Button>
    )
  }
}


function Editor() {
  let { path, url } = useRouteMatch()
  return(
    <p>Editor</p>
  )
}


function Login(props) {

  const [email, updateEmail] = useState("")
  const [password, updatePassword] = useState("")

  let history = useHistory()

  return(
    <form
      onSubmit={event => {
        event.preventDefault()
        axios.post("/api/auth", { email, password }).then(res => {
          localStorage.setItem("authorization", res.data)
          history.push("/");
        })
      }}
    >
      <Box m={2}>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              required
              label="Email"
              value={email}
              onChange={event => {
                updateEmail(event.target.value)
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Password"
              value={password}
              onChange={event => updatePassword(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit">Sign in</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
