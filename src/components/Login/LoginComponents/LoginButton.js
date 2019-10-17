import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: 'green',
      height: '50px',
      width: '310px',
      marginTop: '15px',
      color: 'white',
      '&:hover': {
          background: 'lightgreen'
      }
    }
  }));

export default function LoginButton(props) {
    const classes = useStyles();
       
    return (
        <Button 
            variant="contained" 
            color="default" 
            className={classes.button}
            type='submit'
        >
            {props.text}
        </Button>
    )
  }