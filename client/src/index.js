import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import App from './components/app';
/*
import Timeline from './components/timeline';
import Profile from './components/profile';
import Profileedit from './components/profileedit';
import Settings from './components/settings';
import Course from './components/course';
import ChangePassword from './components/changePassword';
import CreateCourse from './components/createcourse';

// import Nav from './components/Nav';

*/
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";

// ReactDOM.render(<App />, document.getElementById('root'));
/* <Route path='/profile' component={Profile}/>
      <Route path='/profileedit' component={Profileedit}/>
      <Route path='/changePassword' component={ChangePassword}/>
      <Route path='/settings' component={Settings}/>
      <Route path='/createcourse' component={CreateCourse}/>
      */
     

ReactDOM.render(
  <BrowserRouter>
  	<Route path='/' component={App}/>
  </BrowserRouter>
  , document.getElementById('root'));


registerServiceWorker();
