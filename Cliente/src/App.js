import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";


export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <TypoGraphy variant="h6" >
            [ <Link to={`/home/`} style={{ textDecoration: 'none', color: 'white' }}> Home</Link>]
          </TypoGraphy>

          <TypoGraphy variant="h6" >
            <Link
              to={`/login/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Login</Link>
          </TypoGraphy>

          <TypoGraphy variant="h6" >
            <Link
              to={`/Sign_up/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Sign up</Link>
          </TypoGraphy>

        </Toolbar>
      </AppBar>
    </div>
  );
}
