import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import Signup from './components/signup';
import Timeline from './components/timeline';
// import Nav from './components/Nav';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(

  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/timeline' component={Timeline}/>
      </Switch>
  </BrowserRouter>

  , document.getElementById('root'));


registerServiceWorker();
