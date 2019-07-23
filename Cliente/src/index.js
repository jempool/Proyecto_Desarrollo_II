import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Components/Login'
import Home from "./Components/Home"
import Sign_up from "./Components/Sign_up"


const routing = (
    <Router>
      <div>
        <Route exact="/" component={App} />
        <Redirect from="/" to="/home" />

        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign_up" component={Sign_up} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

