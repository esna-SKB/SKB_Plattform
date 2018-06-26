import React from 'react';

import '../main.css';
import Login from './outerPage/login';
import Signup from './outerPage/signup';
import ForgotPassword from './outerPage/forgotPassword';
import ResetPassword from './outerPage/resetPassword';
import VerifyRegistration from './outerPage/verifyRegistration';
import SendRegistrationAgain from'./outerPage/sendRegistrationAgain';

import { Route, Switch } from "react-router-dom";

var BckgrdUrl;

class OuterPage extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 

	/*for changing brackground*/
	const totalImages = 97;
	var chosenOne = Math.ceil(Math.random()* totalImages);
	BckgrdUrl = '../../../backgrounds/' + chosenOne + '.jpg';

	}



	render(){
		return(
			
			 <div className=" heigh100 backgrd" style={{backgroundImage: 'url('+BckgrdUrl+')'}}>
			<div className="row makeBackgroundlight">
     		 <div className="col-12" style={{padding: '10px 10px 10px 25px'}}>

		        <a href="/signup" className='whitehover' style={{color: 'white !important'}}><div className='registrieren_botton'>Registrieren
		        </div></a>
		        <div><p className="keinMitglied" style={{float: 'right',paddingTop: '23px', fontSize: '16px'}}>noch kein Mitglied?</p></div>

			<Switch>
	    		<Route path='/signup' component={Signup}/>
			    <Route path='/forgotPassword' component={ForgotPassword}/>
			    <Route path='/resetPassword' component={ResetPassword}/>
			    <Route path='/verify' component={VerifyRegistration}/>
			    <Route path='/resend' component={SendRegistrationAgain}/>
				<Route path='/' render={(props) => (
					<Login updateEmail={this.props.updateEmail} location={this.props.location} history={this.props.history}/>
				)}/>
			</Switch>

			<div className="center loginfooter_parent">
	            <span  >Impressum</span> <span className="float-right">Datenschutz</span>
	        </div>

	      </div>

      </div>
	  </div>
			);
	}
}

export default OuterPage; 