import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
//import '../css/timeline.css';
import '../../css/profile.css';
/*add this css if you want the profile image on the left (circular)*/
import '../../css/profilepicture.css';
import Meow from'../../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec, deleteUserSession} from '../../utils/userSessionHelper';

const api = require('../../api');


class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user
		}

	}

	logout(){
		deleteUserSession(cookie.load('userID'));
		this.props.history.push("/");
	}

	componentDidMount(){
		//get email

		//das brauchen wir alles nicht 
		//zugriff auf user unter this.props.user
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
				document.getElementById("email").innerHTML = email;
				document.getElementById("email").setAttribute("href","to:"+ email);
				console.log("response is: "+ json);
				console.log("your email is: " + email);

				api.getUser(email)
      	.then(json => {
					//set information in html
					document.getElementById("YourName01").innerHTML = json.firstname+" "+json.lastname;
					document.getElementById("YourName02").innerHTML = json.firstname+" "+json.lastname;
					document.getElementById("btnUsername").innerHTML = json.firstname+" "+json.lastname;
					//document.getElementById("countCourses").innerHTML = json.countCourses;
					//document.getElementById("countGroups").innerHTML = json.countGroups;
					//document.getElementById("countCourses2").innerHTML = json.countCourses;
					//document.getElementById("countGroups2").innerHTML = json.countGroups;
					document.getElementById("description").innerHTML = json.description;
					document.getElementById("iCan").innerHTML = json.iCan;
					document.getElementById("iLearn").innerHTML = json.iLearn;
					document.getElementById("iTeach").innerHTML = json.iTeach;
					document.getElementById("website").innerHTML = json.website;
					document.getElementById("website").setAttribute("href",json.website);

					//dummy values
					var countCourses = 4;
					var countGroups = 3;
					document.getElementById("countCourses").innerHTML = countCourses;
					document.getElementById("countGroups").innerHTML = countGroups;
					document.getElementById("countCourses2").innerHTML = countCourses;
					document.getElementById("countGroups2").innerHTML = countGroups;

					//isadmin abfangen?
					if(json.isTeacher){
						document.getElementById("role").innerHTML = "Lehrer_in";

						//ican/ilearn mit iteach und freie Kurse austauschen
						document.getElementById("trueLearn").style.display = 'none';
						document.getElementById("iLearn").style.display = 'none';
						document.getElementById("trueCan").style.display = 'none';
						document.getElementById("iCan").style.display = 'none';
						document.getElementById("trueTeach").style.display = 'block';
						document.getElementById("iTeach").style.display = 'block';
						document.getElementById("trueOffer").style.display = 'block';


					}else{
						document.getElementById("role").innerHTML = "Student_in";

						// iteach/freie Kurse mit ican und ilearn austauschen
						document.getElementById("trueLearn").style.display = 'block';
						document.getElementById("iLearn").style.display = 'block';
						document.getElementById("trueCan").style.display = 'block';
						document.getElementById("iCan").style.display = 'block';
						document.getElementById("trueTeach").style.display = 'none';
						document.getElementById("iTeach").style.display = 'none';
						document.getElementById("trueOffer").style.display = 'none';
					}
				});
			});
  }



  render() {

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
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnUsername">
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="/profile">Mein Profil</a>
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
            <a className="box col text-center" href="/profile">
			<div className="profilepicleft fill" ><img src={Meow} alt="meow" ></img></div>
				<p></p><p><strong id="YourName01"></strong></p>
            </a>
          </div>
          <div className="row">
            <div className="box col-md-6 text-center">
              <strong id ="countCourses"></strong><br /><small className="text-muted">Kurse</small>
            </div>
            <div className="box col-md-6 text-center">
              <strong id="countGroups"></strong><br /><small className="text-muted">Gruppen</small>
            </div>
          </div>

        </div>

        <div className="col col-sm-6">
				<div className="row box ">
					<div className="col">
						<div className="col">
							<div className="row center-block ">
								<div className="col  profilepicbig fill col-md-12" >
									<img src={Meow} alt="meow" ></img>
								</div>
								<div className="col">
									<div className="row">
										<h4 className="title"><strong id="YourName02"></strong></h4>
									</div>
									<div className="row  text-muted">
										<p className="lineup" id="role"></p>
									</div>
									<div className=" row ">
										<div className="col-sm-12 col-lg-6  text-center d-none d-md-block">
											<strong id ="countCourses2"></strong><br /><small className="text-muted ">Kurse</small>
										</div>
										<div className="col-sm-12  col-lg-6  text-center d-none d-md-block">
											<strong  id="countGroups2"></strong><br /><small className="textstrong text-muted ">Gruppen</small>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row-12 text-muted">
								<div className="col-12 description" id="description"></div>
						</div>
						<div className="row-12 text-muted text-right">
							<div className="col-12 edit">
								<a href="/profileedit" >Profil bearbeiten</a>
							</div>
						</div>
					</div>
				</div>


				<div className="row box newpart">
					<div className="col-sm-12">
						<div className="col">
							<div className="row  text-muted">
								<div className="col-4" id="trueCan">ich kann:</div>
								<div className="col-8" id="iCan"></div>
								<div className="col-4" id="trueTeach">ich bringe bei:</div>
								<div className="col-8" id="iTeach"></div>
							</div>

							<div className="row  lineup ">
								<div className="col-4 text-muted " id="trueLearn">ich lerne:</div>
								<div className="col-8 text-muted" id="iLearn"></div>
								<div className="col-12" id="trueOffer"><strong>mein kostenloses Angebot:</strong></div>
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
							<div className="row text-muted lineup ">
								<div className="col-4 ">Website:</div>
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

export default Profile;
