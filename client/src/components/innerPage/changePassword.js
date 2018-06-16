import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
import '../../css/timeline.css';
import Meow from'../../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../../utils/userSessionHelper'; 

const api = require('../../api');
const qs = require('query-string');

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user,
		  oldpassword: "",
		  newpassword: "",
		  checkpassword: "",
		  errorMessage: '',

		}
		
		this.handleOldPassword = this.handleOldPassword.bind(this);
		this.handleNewPassword = this.handleNewPassword.bind(this);
		this.handleCheckPassword = this.handleCheckPassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	
	
	handleOldPassword(event) {
		this.setState({
		  oldpassword: event.target.value,
		});
	}
	
	
	handleNewPassword(event) {
		this.setState({
		  newpassword: event.target.value,
		});
	}

	handleCheckPassword(event) {
		this.setState({
		  checkpassword: event.target.value,
		});
	}

	
	handleSubmit() {
		// Grab state
		const {
			oldpassword,
			newpassword,
			checkpassword,
		} = this.state;
		
		 //password validation
		  if (newpassword.length < 8){
				console.log("Dein Passwort muss aus mind. acht Zeichen bestehen.");
				return false;
		  }
		//check newpassword == checkpassword
		if(!(newpassword === checkpassword)){
			console.log("Neues Passwort stimmt nicht ueberein!");	
			return false;
		}
		//check if old password is correct
		api.checkPassword(this.props.user.email,oldpassword).then(json =>{
			if(json.success === false){
				console.log("wrong passwort");
				return false;
			}else{
				let userId = this.props.user._id; 
				api.resetPassword(userId, newpassword).then(json => {
					if(json.success === true){
						console.log("Successfully change password");
					}else{
						console.log("fails to change passoword")
					}
				});
			}	
		});
		
		
		
		
	}
	  

 
  render() {

	const {
		oldpassword,
		newpassword,
		checkpassword,
	} = this.state;
  
    //Checks if there is an active UserSession
    fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {
      
      if(res.status === 500){
        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})
        
      }
    });

    return (
      <div>
     

    

      <div className="container-fluid">

      <div className="background row">

       

        <div className="col col-sm-12">
				<div className="row box ">
					<div className="col-sm-12">
							<div className="row center-block">
									<h4 className="title"><strong>Passwort ändern</strong></h4>
							</div>	
	
								<div className="row">
									<div className="col">
										<div className="form-group row newpart" >
											<label htmlFor="oldpwd">altes Passwort eingeben:</label>
											<input type="password" className="form-control" name="oldpassword" value= {oldpassword} onChange={this.handleOldPassword}></input>
										</div>
										
										<div className="form-group row newpart" >
											<label htmlFor="newpwd">neues Passwort eingeben:</label>
											<input type="password" className="form-control" name="newpassword" placeholder="mindestens 8 Zeichen" value= {newpassword} onChange={this.handleNewPassword}></input>
										</div>
										
										<div className="form-group row newpart">
											<label htmlFor="newpwd2">neues Passwort wiederholen:</label>
											<input type="password" className="form-control" name="checkpassword" placeholder="mindestens 8 Zeichen" value= {checkpassword} onChange={this.handleCheckPassword}></input>
										</div>
										
									</div>
								</div>
								<div className="row-12 text-muted text-left newpart">
										<Link to={`/forgotPassword`} >Passwort vergessen?</Link>
								</div>
								<button className="btn btn-primary" onClick={this.handleSubmit }>Passwort ändern</button>
							
							<div className="row-12 text-muted text-right">
								<div className="col-12">
									<Link to={`/settings`} >zurück</Link>
								</div>
							</div>
						
					</div>
				</div>
			
				
		</div>
				
				
	
    </div>
	</div>
	</div>
    );
  }
}

export default ChangePassword;