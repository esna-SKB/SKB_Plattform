import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { updateTimeSec } from '../../utils/userSessionHelper';

import '../../css/timeline.css';
import '../../css/uploadfile.css'

// import Meow from'../../img/meow.png';
import Upload from'../../img/upload.png';


const api = require('../../api');


class Profileedit extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user,
		  description: this.props.user.description,
		  iCan: this.props.user.iCan,
		  iLearn: this.props.user.iLearn,
		  iTeach: this.props.user.iTeach,
		  website: this.props.user.website,
		}
		//look at https://reactjs.org/docs/forms.html
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.handlePic = this.handlePic.bind(this);
		
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handlePic(files){
		//change curret pic with uploaded pic
	}
	
	onSave(){
		/*var des, can, learn, teach, web;

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
		}*/


		//Grab state
		const {
			description,
			iCan,
			iLearn,
			iTeach,
			website,
		} = this.state;
		api.updateUser(this.props.user.email, this.props.user.firstname, this.props.user.lastname, this.props.user.email, this.props.user.isTeacher, this.props.user.isAdmin, this.props.user.isValide, description, iCan, iLearn, iTeach,website );

	}

	componentDidMount(){
		//load current profilepicture
	
	
		//isadmin abfangen?
		if(this.props.user.isTeacher){
			document.getElementById("learn").style.display = 'none';
			document.getElementById("can").style.display = 'none';
			document.getElementById("teach").style.display = 'block';


		}else{
			document.getElementById("learn").style.display = 'block';
			document.getElementById("can").style.display = 'block';
			document.getElementById("teach").style.display = 'none';
		}

    }



  render() {
	  //grab state
	  const {
			description,
			iCan,
			iLearn,
			iTeach,
			website,
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
									<h4 className="title"><strong>Profil bearbeiten</strong></h4>
							</div>

							<form>
								<div className="row">
									<div className="col">
										<div></div>
										<div className="current_picture newpart"></div>
										<div className="form-group row newpart">
											<input className="HideTheUglyInput"type="file" name="profilepic" id="profilepic" onChange={this.handlePic(this.files)}></input>
											<label className="TheBeautifulInput" htmlFor="profilepic">
												<img id="upload_icon" className="upload_icon" src={Upload} alt="Upload Icon"/>
												Bild ändern
											</label>
										</div>
									
										<div className="form-group row newpart" >
											<label htmlFor="description">Beschreibung</label>
											<textarea className="form-control" name="description" rows="3" aria-describedby="Help1" value={description} onChange={this.onChange}></textarea>
											<small  id="Help1" className="form-text text-muted">Erzähle etwas über dich. Suchst du nach einer Gruppe zum lernen? Was sind deine Hobbies? </small>
										</div>

										<div className="form-group row newpart" id="can">
											<label  htmlFor="exampleInputEmail1">ich kann:</label>
											<input  type="text" className="form-control" name="iCan" aria-describedby="Help" value={iCan} onChange={this.onChange}></input>
											<small  id="Help" className="form-text text-muted">Erzähle, welche Sprachen du schon alle beherrschst. zum Beispiel Englisch B2 , Deutsch(Muttersprache)</small>
										</div>

										<div className="form-group row newpart" id="learn">
											<label  htmlFor="iLearn">ich lerne:</label>
											<input  type="text" className="form-control" name="iLearn" aria-describedby="Help3" value={iLearn} onChange={this.onChange}></input>
											<small  id="Help2" className="form-text text-muted">zum Beispiel Englisch B2, Deutsch , Arabisch</small>
										</div>

										<div className="form-group row newpart" id="teach">
											<label  htmlFor="iTeach">ich bringe bei:</label>
											<input  type="text" className="form-control" name="iTeach" aria-describedby="Help2" value={iTeach} onChange={this.onChange}></input>
											<small  id="Help2" className="form-text text-muted">zum Beispiel Englisch, Spanisch A2, Arabisch A1</small>
										</div>

										<div className="form-group row newpart" id="teach">
											<label  htmlFor="website">Website:</label>
											<input  type="text" className="form-control" name="website" value={website} onChange={this.onChange}></input>
										</div>

									</div>
								</div>
								<div className="row checkBoxes">
									<div className="col">
										<div className="form-group form-check row">
											<input type="checkbox" className="form-check-input" id="Check1"></input>
											<label className="form-check-label" htmlFor="exampleCheck1">Zeige deine Email-Adresse an</label>
										</div>
										<div className="form-group form-check row" id="countgroup">
											<input type="checkbox" className="form-check-input" id="eCheck2"></input>
											<label className="form-check-label" htmlFor="exampleCheck1">Zeige deine Gruppenanzahl an</label>
										</div>
										<div className="form-group form-check row" id="countKurs">
											<input type="checkbox" className="form-check-input" id="Check3"></input>
											<label className="form-check-label" htmlFor="exampleCheck1">Zeige deine Kursanzahl an</label>
										</div>
									</div>
								</div>
								<a type="button" href="/profile" className="btn btn-primary" onClick={this.onSave}>Speichern</a>
							</form>
							<div className="row-12 text-muted text-right">
								<div className="col-12">
									<Link  to={`/profile`}>zurück</Link>
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

export default Profileedit;
