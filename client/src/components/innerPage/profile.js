import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import '../css/timeline.css';
import '../../css/profile.css';
/*add this css if you want the profile image on the left (circular)*/
import '../../css/profilepicture.css';
import Meow from'../../img/meow.png';

// const api = require('../../api');


class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user
		}
	}

	componentDidMount(){

		//dummy values
		var countCourses = 4;
		var countGroups = 3;
		document.getElementById("countCourses2").innerHTML = countCourses;
		document.getElementById("countGroups2").innerHTML = countGroups;

		//isadmin abfangen?
		if(this.props.user.isTeacher){
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
  }



  render() {

    return (
      <div>
		<div className="container-fluid">
			<div className="background row">

				<div className="col col-sm-12">
						<div className="row box ">
							<div className="col">
								<div className="col">
									<div className="row center-block ">

										<div className="col  profilepicbig fill col-md-12" style={{backgroundImage: 'url('+Meow+')'}}>
										</div>

										<div className="makespace col">
											<div className=" row">
												<h4 className="title"><strong id="YourName02">{this.props.user.firstname + " " + this.props.user.lastname}</strong></h4>
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
										<div className="col-12 description" id="description">{this.props.user.description}</div>
								</div>
								<div className="row-12 text-muted text-right">
									<div className="col-12 edit">
										<Link to={`/profileedit`} >Profil bearbeiten</Link>
									</div>
								</div>
							</div>
						</div>


						<div className="row box newpart">
							<div className="col-sm-12">
								<div className="col">
									<div className="row  text-muted">
										<div className="col-4" id="trueCan">ich kann:</div>
										<div className="col-8" id="iCan">{this.props.user.iCan}</div>
										<div className="col-4" id="trueTeach">ich bringe bei:</div>
										<div className="col-8" id="iTeach">{this.props.user.iTeach}</div>
									</div>

									<div className="row  lineup ">
										<div className="col-4 text-muted " id="trueLearn">ich lerne:</div>
										<div className="col-8 text-muted" id="iLearn">{this.props.user.iLearn}</div>
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
										<a className="col-8" id="email" href={"mailto:" + this.props.user.email}>{this.props.user.email}</a>
									</div>
									<div className="row text-muted lineup ">
										<div className="col-4 ">Website:</div>
										<a className="col-8" id="website" href={"http://" + this.props.user.website}>{this.props.user.website}</a>
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

export default Profile;
