import React, { useState, useEffect } from "react"

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom"

import {
  TextField,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
} from "@material-ui/core"

import axios from "axios"


export default function App() {
  return(
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}


function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest}
      render={
        () => localStorage.getItem("authorization") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}


function Home(props) {
  let history = useHistory()
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="flex-end"
            >
              <Grid item>
                <Button
                  onClick={
                    () => {
                      localStorage.removeItem("authorization")
                      history.push("/")
                    }
                  }
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box m={2}>
        </Box>
      </>
    )
}


function Bookshelf(props) {
  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      {
        props.books.map(book => <Book {...book} />)
      }
    </Grid>
  )
}


function Book(props) {
  return (
    <Grid item key={props.id}>
      <Button variant="contained" color="primary">
        <Typography variant="body1">{props.id}</Typography>
      </Button>
    </Grid>
  )
}


function Login(props) {

  const [email, updateEmail] = useState("")
  const [password, updatePassword] = useState("")

  let history = useHistory()

  return(
    <form onSubmit={event => {
      event.preventDefault()
      axios.post("/api/auth", { email, password })
        .then(res => {
          localStorage.setItem("authorization", res.data)
          history.push("/");
        })
    }}
    >
      <Box m={2}>
        <Container maxWidth="xs">
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <TextField
                required
                label="Email"
                value={email}
                onChange={event => updateEmail(event.target.value)}
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
        </Container>
      </Box>
    </form>
  )
}
