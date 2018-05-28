import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import Signup from './components/signup';
// import Nav from './components/Nav';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/signup' component={Signup}/>
      </Switch>
  </BrowserRouter>

  , document.getElementById('root'));


registerServiceWorker();
