import React, { useState } from "react"
import axios from "axios"

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@material-ui/core"


export default function Login() {

  const [username, updateUsername] = useState("")
  const [password, updatePassword] = useState("")

  return(
    <form onSubmit={(event) => {
      axios.post("/api/auth", { username, password })
        .then(res => localStorage.setItem("token", res.data))
      event.preventDefault()
    }}
    >
      <Box m={2}>
        <Container maxWidth="xs">
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                required
                label="Username"
                value={username}
                onChange={event => updateUsername(event.target.value)}
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
