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
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	
	
	handleInputChange(event) {
		const target = event.target;
		const value =  target.value;
		const name = target.name;

		this.setState({
		  [name]: value
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
			 this.setState({
				  errorMessage : "Dein Passwort muss aus mind. acht Zeichen bestehen."
			 });
			   return false;
		  }
		//check newpassword == checkpassword
		if(!(newpassword === checkpassword)){
			console.log("Neues Passwort stimmt nicht ueberein!");	
			return false;
		}
		//check if old password is correct
		
		if(!this.props.user.validPassword(oldpassword)){
			console.log("wrong passwort");
			return false;
		}
		
		//update Password
		let userId = qs.parse(this.props.location.search).id
		 
		api.resetPassword(userId, newpassword).then(json => {
			if(json.success === true){
				console.log("Successfully change password");
			}else{
				console.log("failes to change passoword")
			}
			
		});
		
	}
	  

 
  render() {

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
							
							<form>
								<div className="row">
									<div className="col">
										<div class="form-group row newpart">
											<label for="oldpwd">altes Passwort eingeben:</label>
											<input type="password" class="form-control" name="oldpassword"></input>
										</div>
										
										<div class="form-group row newpart">
											<label for="newpwd">neues Passwort eingeben:</label>
											<input type="password" class="form-control" name="newpassword" placeholder="mindestens 8 Zeichen"></input>
										</div>
										
										<div class="form-group row newpart">
											<label for="newpwd2">neues Passwort wiederholen:</label>
											<input type="password" class="form-control" name="checkpassword" placeholder="mindestens 8 Zeichen"></input>
										</div>
										
									</div>
								</div>
								<div className="row-12 text-muted text-left newpart">
										<a href="/forgotPassword">Passwort vergessen?</a>
								</div>
								<button class="btn btn-primary" onClick={this.handleSubmit }>Passwort ändern</button>
							</form>
							<div className="row-12 text-muted text-right">
								<div className="col-12">
									<a href="/profile">zurück</a>
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
