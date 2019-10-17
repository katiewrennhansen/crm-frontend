import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
      
    },
  }));

export default function PasswordInput() {
    const classes = useStyles()
    
    return (
        <TextField
            id="outlined-password-input"
            label="Password"
            name='password'
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
        />
    )
  }