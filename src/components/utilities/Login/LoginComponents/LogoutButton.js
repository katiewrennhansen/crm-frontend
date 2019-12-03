import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: 'white',
      height: '40px',
      width: '80px',
      color: 'green',
      border: '1px solid green',
      '&:hover': {
          background: 'green',
          color: 'white'
      }
    }
  }));

export default function SubmitButton(props) {
    const classes = useStyles();
       
    return (
        <Button 
            variant="contained" 
            color="default" 
            className={classes.button}
            onClick={props.handleLogout}
        >
            {props.text}
        </Button>
    )
  }