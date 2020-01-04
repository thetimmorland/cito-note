import React, { useState } from "react"
import axios from "axios"

import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Fab,
  CssBaseline,
} from "@material-ui/core"

import { Add } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}))


function Book(props) {
  return (
    <Grid item xs>
      <Button variant="contained" color="primary">
          <Typography variant="h3">
            {props.name}
          </Typography>
      </Button>
    </Grid>
  )
}


export default function Home(props) {
  const [state, updateState] = useState({
    books: [{ name: "MTHE235" }]
  })

  const Axios = axios.create({
    headers: { "Authorization": props.authToken }
  });

  const classes = useStyles();

  return(
    <Box m={2}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {state.books.map(book => <Book {...book} />)}
      </Grid>

      <Fab
        className={classes.fab}
        onClick={() => Axios.post("/api/books")}
      >
        <Add />
      </Fab>
    </Box>
  )
}
