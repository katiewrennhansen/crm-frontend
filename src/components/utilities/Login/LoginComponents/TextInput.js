import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
      width: '310px',
      textAlign: 'center'
    }
  }));

  export default function TextInput(props){
      const classes = useStyles();
      return (
        <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            name={props.name}
            className={classes.textField}
            autoComplete={props.name}
            margin="normal"
            variant="outlined"
            onChange={props.onChange}
            value={props.value}
      />
      )
  }