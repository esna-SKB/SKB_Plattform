import React from 'react';

import Login from './outerPage/login';
import Signup from './outerPage/signup';
import ForgotPassword from './outerPage/forgotPassword';
import ResetPassword from './outerPage/resetPassword';
import VerifyRegistration from './outerPage/verifyRegistration';
import SendRegistrationAgain from'./outerPage/sendRegistrationAgain';

import { Route, Switch } from "react-router-dom";

class OuterPage extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}



	render(){
		console.log(this.props.location); 
		return(
			<Switch>
				<Route exact path='/' render={(props) => (
					<Login location={this.props.location} history={this.props.history}/>
				)}/>
	    		<Route path='/signup' component={Signup}/>
			    <Route path='/forgotPassword' component={ForgotPassword}/>
			    <Route path='/resetPassword' component={ResetPassword}/>
			    <Route path='/verify' component={VerifyRegistration}/>
			    <Route path='/resend' component={SendRegistrationAgain}/>
			</Switch>
			);
	}
}

export default OuterPage; 