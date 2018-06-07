import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import '../css/timeline.css';
import Meow from'../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper'; 


class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  status: 0,
		  firstname: '',
		  lastname: '',
		  email: '',
		  isTeacher: false,
		  isAdmin: false,
		  description: '',
		  iCan: '',
		  iLearn: '',
		  iTeach: '',
		  website: '',
		  errorMessage: '',
		  infoMessage: ''
		}	
	
	}
	
	
	componentDidMount(){
	/*	//get email
		var token = cookie.load('userID');
		fetch('userSession/email/${token}', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }

		}).then(res => {
			if(res == 'No User Session found)'){
				console.log("no user in session found");
			}else{
				this.setState({
					email: res	
				});
				console.log("your email is: " + this.email);
			}
			
		})*/
		

		//test state
		var	firstname ="Margetha";
		var	lastname = "Hennes";
		var	isTeacher= true;
		var	isAdmin= false;
		var	description = "This is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is me";
		var	iCan= "Französisch(B2),Deutsch";
		var	iLearn="Spanisch";
		var	iTeach="Leben kennen lernen und lieben";
		var	website="http://esna.de";
		var	email= "magii.el@hotmail.de";
		var countCourses = 4;
		var countGroups = 3;

		
		//get rest
		 /*fetch("/user/magii.el@hotmail.de", {

		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			

		  }}).then(res => res.json()).then(json => {
					console.log('json', json);
					this.setState({
					  firstname: json.firstname,
					  lastname: json.lastname,
					  isTeacher: json.isTeacher,
					  isAdmin: json.isAdmin,
					  description: json.description,
					  iCan: json.iCan,
					  iLearn: json.iLearn,
					  iTeach: json.iTeach,
					  website: json.website,
					  errorMessage: '',
					  infoMessage: ''
					});
				});
	*/

	
      }


  // logout() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const obj = getFromStorage('the_main_app');
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // Verify token
  //     fetch('/api/account/logout?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token: '',
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

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
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img id="logo" className="logo" src={Logo} alt="Logo"/></a>
          </div>

          <form className="navbar-form navbar-center" action="/search">
            <div className="input-group">
              <div className="input-group-btn">
                <button className="searchbutton btn" type="submit"></button>
              </div>
              <input type="text" className="searchbar form-control" placeholder="Search" name="srch-term" id="srch-term"/>
            </div>
          </form>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><img id="chat" className="icon" src={Chat} alt="Chat"/></a></li>
            <li><a href="#"><img id="notifications" className="icon" src={Bell} alt="Bell"/></a></li>
			<div class="btn-group">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnUsername">SKB User
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Mein Profil</a>
                <a class="dropdown-item" href="/settings">Einstellungen</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-danger" onClick={this.logout} href="/">Log Out</a>
              </div>
            </div>
          </ul>

        </div>
      </nav>

      <div className="background-fluid">
        <ul class="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
            <li class = "nav-item">
                <a class="nav-link "  href="/timeline" role="tab">Lehrer</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="kurse-tab" data-toggle="tab" href="#kurse" role="tab" aria-controls="kurse" aria-selected="false">Kurse</a>
            </li>
            
            
            <li class="nav-item">
                <a class="nav-link" id="gruppen-tab" data-toggle="tab" href="#gruppen" role="tab" aria-controls="gruppen" aria-selected="false">Gruppen</a>
            </li>
            

            <li class="nav-item">
                <a class="nav-link" id="kalendar-tab" data-toggle="tab" href="#kalendar" role="tab" aria-controls="kalendar" aria-selected="false">Kalendar</a>
            </li>
          </ul>
      </div>

      <div className="container-fluid">

      <div className="background row">

        <div className="col col-sm-3">
          <div className="row">
            <div className="box col text-center">
			<div className="profilepicleft fill" ><img src={Meow} alt="meow" ></img></div>
				<p></p><p><strong id="YourName01">SKB User</strong></p>
            </div>
          </div>
          <div className="row">
            <div className="box col-md-6 text-center">
              <strong id ="countCourses">2</strong><br /><small className="text-muted">Kurse</small>
            </div>
            <div className="box col-md-6 text-center">
              <strong id="countGroups">5</strong><br /><small className="text-muted">Gruppen</small>
            </div>
          </div>

        </div>

        <div className="col col-sm-6">
				<div className="row box ">
					<div className="col-sm-12">
							<div className="row center-block">
									<h4 className="title"><strong>Profil ändern</strong></h4>
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
				
				
			
				  
			
        <div className="col col-sm-3">
            <div className="row">
				<div className="box col-sm-12">
					<h6>Kurs Leitern Kontaktieren</h6>
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
