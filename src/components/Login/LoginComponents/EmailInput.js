import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
      
    }
  }));

  export default function EmailInput(){
      const classes = useStyles();
      return (
        <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            className={classes.background}
            autoComplete="email"
            margin="normal"
            variant="outlined"
      />
      )
  }

