import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import Signup from './components/signup';
import Timeline from './components/timeline';
import Profile from './components/profile';
import Profileedit from './components/profileedit';
import Settings from './components/settings';
import Course from './components/course';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import VerifyRegistration from './components/verifyRegistration'
import SendRegistrationAgain from'./components/sendRegistrationAgain'
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
	  <Route path='/profile' component={Profile}/>
	  <Route path='/profileedit' component={Profileedit}/>
	  <Route path='/settings' component={Settings}/>
      <Route path='/course' component={Course}/>
      <Route path='/forgotPassword' component={ForgotPassword}/>
      <Route path='/resetPassword' component={ResetPassword}/>
      <Route path='/verify' component={VerifyRegistration}/>
      <Route path='/resend' component={SendRegistrationAgain}/>
      </Switch>
  </BrowserRouter>

  , document.getElementById('root'));


registerServiceWorker();
