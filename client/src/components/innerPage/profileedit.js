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
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
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
										<div class="form-group row newpart" >
											<label for="description">Beschreibung</label>
											<textarea class="form-control" name="description" rows="3" aria-describedby="Help1" value={description} onChange={this.onChange}></textarea>
											<small  id="Help1" class="form-text text-muted">Erzähle etwas über dich. Suchst du nach einer Gruppe zum lernen? Was sind deine Hobbies? </small>
										</div>
										
										<div class="form-group row newpart" id="can">
											<label  for="exampleInputEmail1">ich kann:</label>
											<input  type="text" class="form-control" name="iCan" aria-describedby="Help" value={iCan} onChange={this.onChange}></input>
											<small  id="Help" class="form-text text-muted">Erzähle, welche Sprachen du schon alle beherrschst. zum Beispiel Englisch B2 , Deutsch(Muttersprache)</small>
										</div>
										
										<div class="form-group row newpart" id="learn">
											<label  for="iLearn">ich lerne:</label>
											<input  type="text" class="form-control" name="iLearn" aria-describedby="Help3" value={iLearn} onChange={this.onChange}></input>
											<small  id="Help2" class="form-text text-muted">zum Beispiel Englisch B2, Deutsch , Arabisch</small>
										</div>
										
										<div class="form-group row newpart" id="teach">
											<label  for="iTeach">ich bringe bei:</label>
											<input  type="text" class="form-control" name="iTeach" aria-describedby="Help2" value={iTeach} onChange={this.onChange}></input>
											<small  id="Help2" class="form-text text-muted">zum Beispiel Englisch, Spanisch A2, Arabisch A1</small>
										</div>
										
										<div class="form-group row newpart" id="teach">
											<label  for="website">Website:</label>
											<input  type="text" class="form-control" name="website" value={website} onChange={this.onChange}></input>
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
