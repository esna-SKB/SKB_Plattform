import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import '../css/timeline.css';
import Meow from'../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper'; 

const api = require('../api');


class Profileedit extends Component {
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
	
	onSave(){
		//get email
		var token = cookie.load('userID');
		var email;
		console.log("token tosend fetch: "+ token);
		fetch('userSession/'+ token+ '/email', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }

		}).then(res => res.json())
			.then(json => {
				//get current Userdata
				//userId = email
				api.getUser(json.userId)
				.then(json => { 
					var des, can, learn, teach, web;
					
					//check if anything is left empty
					if(document.getElementById("description").value.length == 0){
						des = "";	
					}else{
						des = document.getElementById("description").value;
					}
					
					if(document.getElementById("iCan").value.length == 0){
						can = "";
					}else{
						can = document.getElementById("iCan").value;
					}
					
					if(document.getElementById("iLearn").value.length == 0){
						learn = "";
					}else{
						learn = document.getElementById("iLearn").value;
					}
					
					if(document.getElementById("iTeach").value.length == 0){
						teach = "";	
					}else{
						teach = document.getElementById("iTeach").value;
					}
				
					if(document.getElementById("website").value.length == 0){
						web = ""	
					}else{
						web = document.getElementById("website").value;
					}
					
					api.updateUser(json.email, json.firstname, json.lastname, json.email, json.isTeacher, json.isAdmin, json.isValide, des, can, learn, teach,web );
			
				});
			
			});
	}
	
	componentDidMount(){
		//get email
		var token = cookie.load('userID');
		var email;
		console.log("token tosend fetch: "+ token);
		fetch('userSession/'+ token+ '/email', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }

		}).then(res => res.json())
      .then(json => {
			//set email in html
			email = json.userId;
			console.log("response is: "+ json);
			console.log("your email is: " + email);

			api.getUser(email)
      	.then(json => {
					//set information in html
					document.getElementById("description").value = json.description;
					document.getElementById("iCan").value = json.iCan;
					document.getElementById("iLearn").value = json.iLearn;
					document.getElementById("iTeach").value = json.iTeach;
					document.getElementById("website").value = json.website;

					//dummy values
					var countCourses = 4;
					var countGroups = 3;
					document.getElementById("countCourses").innerHTML = countCourses;
					document.getElementById("countGroups").innerHTML = countGroups;
					//document.getElementById("countCourses2").innerHTML = countCourses;
					//document.getElementById("countGroups2").innerHTML = countGroups;

					//isadmin abfangen?
					if(json.isTeacher){
						document.getElementById("learn").style.display = 'none';
						document.getElementById("can").style.display = 'none';
						document.getElementById("teach").style.display = 'block';


					}else{
						document.getElementById("learn").style.display = 'block';
						document.getElementById("can").style.display = 'block';
						document.getElementById("teach").style.display = 'none';
					}
				});
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
                <a class="dropdown-item" href="/profile">Mein Profil</a>
                <a class="dropdown-item" href="/settings">Einstellungen</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
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
									<h4 className="title"><strong>Profil bearbeiten</strong></h4>
							</div>	
							
							<form>
								<div className="row">
									<div className="col">
										<div></div>
										<div class="form-group row newpart" >
											<label for="description">Beschreibung</label>
											<textarea class="form-control" id="description" rows="3" aria-describedby="Help1"></textarea>
											<small  id="Help1" class="form-text text-muted">Erzähle etwas über dich. Suchst du nach einer Gruppe zum lernen? Was sind deine Hobbies? </small>
										</div>
										
										<div class="form-group row newpart" id="can">
											<label  for="exampleInputEmail1">ich kann:</label>
											<input  type="text" class="form-control" id="iCan" aria-describedby="Help"></input>
											<small  id="Help" class="form-text text-muted">Erzähle, welche Sprachen du schon alle beherrschst. zum Beispiel Englisch B2 , Deutsch(Muttersprache)</small>
										</div>
										
										<div class="form-group row newpart" id="learn">
											<label  for="iLearn">ich lerne:</label>
											<input  type="text" class="form-control" id="iLearn" aria-describedby="Help3"></input>
											<small  id="Help2" class="form-text text-muted">zum Beispiel Englisch B2, Deutsch , Arabisch</small>
										</div>
										
										<div class="form-group row newpart" id="teach">
											<label  for="iTeach">ich bringe bei:</label>
											<input  type="text" class="form-control" id="iTeach" aria-describedby="Help2"></input>
											<small  id="Help2" class="form-text text-muted">zum Beispiel Englisch, Spanisch A2, Arabisch A1</small>
										</div>
										
										<div class="form-group row newpart" id="teach">
											<label  for="iTeach">Website:</label>
											<input  type="text" class="form-control" id="website"></input>
										</div>
										
									</div>
								</div>
								<div className="row checkBoxes">
									<div className="col">
										<div class="form-group form-check row">
											<input type="checkbox" class="form-check-input" id="Check1"></input>
											<label class="form-check-label" for="exampleCheck1">Zeige deine Email-Adresse an</label>
										</div>
										<div class="form-group form-check row" id="countgroup">
											<input type="checkbox" class="form-check-input" id="eCheck2"></input>
											<label class="form-check-label" for="exampleCheck1">Zeige deine Gruppenanzahl an</label>
										</div>
										<div class="form-group form-check row" id="countKurs">
											<input type="checkbox" class="form-check-input" id="Check3"></input>
											<label class="form-check-label" for="exampleCheck1">Zeige deine Kursanzahl an</label>
										</div>
									</div>
								</div>
								<button type="button" class="btn btn-primary" onClick={this.onSave}>Speichern</button>
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

export default Profileedit;
