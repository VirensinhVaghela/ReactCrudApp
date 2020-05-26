import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import logo from './logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    flexGrow: 0,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar >
          <Button  className={classes.button} onClick={event => window.location.href="/Login"} color="inherit">Login</Button>
          <Button  className={classes.button} onClick={event => window.location.href="/Registration"} color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
      {/* <header className="App-header">
        <ImageLogo className="App-logo" alt="logo" style={{width:"500px"}}  />  
        <p>
          To Learn React Login into account.
        </p>
      </header> */}
    </div>
  );
}


