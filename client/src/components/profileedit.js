import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import '../css/timeline.css';
import Meow from'../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper'; 


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
		var	isTeacher= false;
		var	isAdmin= false;
		var	description = "This is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is meThis is me This is me This is me This is me";
		var	iCan= "Französisch(B2),Deutsch";
		var	iLearn="Spanisch";
		var	iTeach="";
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

			
			//set information in html
			document.getElementById("YourName01").innerHTML = firstname+" "+lastname;
			document.getElementById("YourName02").innerHTML = firstname+" "+lastname;
			document.getElementById("countCourses").innerHTML = countCourses;
			document.getElementById("countGroups").innerHTML = countGroups;
			document.getElementById("countCourses2").innerHTML = countCourses;
			document.getElementById("countGroups2").innerHTML = countGroups;
			document.getElementById("description").innerHTML = description;
			document.getElementById("iCan").innerHTML = iCan;
			document.getElementById("iLearn").innerHTML = iLearn;
			document.getElementById("email").innerHTML = email;
			document.getElementById("email").setAttribute("href","to:"+ email);
			document.getElementById("website").innerHTML = website;
			document.getElementById("website").setAttribute("href", website);

			//isadmin abfangen
			if(isTeacher){
				//rolle = Lehrer_in
				//ican/ilearn mit iteach und freie Kurse austauschen
			}else{
				document.getElementById("role").innerHTML = "Student_in";
	
			}
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
   /* fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {
      
      if(res.status === 500){


        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})
        
      }
    });*/

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
				<p></p><p><strong id="YourName01"></strong></p>
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
					<div className="col">
						<div className="col">
							<div className="row center-block ">
								<div className="col white profilepicbig fill " >
									<img src={Meow} alt="meow" ></img>	
								</div>
								<div className="col">
									<div className="row">
										<h4 className="title"><strong id="YourName02"></strong></h4>
									</div>
									<div className="row text-muted">
										<p className="lineup" id="role"></p>
									</div>
									<div className="row">
										<div className=" col-md-6 text-center">
											<strong id ="countCourses2">2</strong><br /><small className="text-muted">Kurse</small>
										</div>
										<div className=" col-md-6 text-center">
											<strong  id="countGroups2">5</strong><br /><small className="textstrong text-muted">Gruppen</small>
										</div>
									</div>
								</div>
							</div>		
						</div>
						<div className="row-12 text-muted">
								<div className="col-12 description" id="description"></div>
						</div>
						<div className="row-12 text-muted text-right">
							<div className="col-12">
								<a href="/profileedit">Profil bearbeiten</a>
							</div>
						</div>
					</div>
				</div>
				
				
				<div className="row box newpart">
					<div className="col-sm-12">
						<div className="col">
							<div className="row  text-muted">
								<div className="col-4">ich kann:</div>
								<div className="col-8" id="iCan"></div>
							</div>
							<div className="row "><p></p></div>
							<div className="row lineup"><p></p></div>
							<div className="row text-muted ">
								<div className="col-4">ich lerne:</div>
								<div className="col-8" id="iLearn"></div>
							</div>
						</div>
					</div>
				</div>
				
				
				<div className="row box newpart">
					<div className=" col-sm-12">
						<div className="col">
								<div className="row  text-muted">
								<div className="col-4">E-Mail:</div>
								<a className="col-8" id="email"></a>
							</div>
							<div className="row "><p></p></div>
							<div className="row lineup"><p></p></div>
							<div className="row text-muted ">
								<div className="col-4">Website:</div>
								<a className="col-8" id="website"></a>
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
