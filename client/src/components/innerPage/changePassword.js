import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
import '../../css/timeline.css';
import Meow from'../../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../../utils/userSessionHelper'; 


class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user
		}
	}
	
	
	componentDidMount(){

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
											<input type="password" class="form-control" id="oldpwd"></input>
										</div>
										
										<div class="form-group row newpart">
											<label for="newpwd">neues Passwort eingeben:</label>
											<input type="password" class="form-control" id="newpwd" placeholder="mindestens 8 Zeichen"></input>
										</div>
										
										<div class="form-group row newpart">
											<label for="newpwd2">neues Passwort wiederholen:</label>
											<input type="password" class="form-control" id="newpwd2" placeholder="mindestens 8 Zeichen"></input>
										</div>
										
									</div>
								</div>
								<div className="row-12 text-muted text-left newpart">
										<a href="/forgotPassword">Passwort vergessen?</a>
								</div>
								<button type="submit" class="btn btn-primary">Passwort ändern</button>
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
