import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/timeline.css';
import '../../css/profilepicture.css';
import '../../css/uploadfile.css'

import Upload from '../../img/upload.png';


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
      picturedata: this.props.user.picturedata,
      type: this.props.user.type,
      currentpic: null,
      file: null,
    }
    //look at https://reactjs.org/docs/forms.html
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getBase64 = this.getBase64.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fileUploader = (event) => {
    this.setState({
      file: event.target.files[0]
    });


    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function(e) {
        document.getElementById("currentpic").src = e.target.result;
      }
    }

  }

  getBase64(file, cb) {
    if (!file) return cb("");
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      //console.log(reader.result);
      cb(reader.result)
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }


  onSave() {
    //Grab state
    var updateUser = {};
    const email = this.state.user.email
    const {description, iCan, iLearn, iTeach, website, file} = this.state;
    updateUser.description = description;
    updateUser.iCan = iCan;
    updateUser.iLearn = iLearn;
    updateUser.iTeach = iTeach;
    updateUser.website = website;

    var that = this;
    if (!file) {
      //if(delete pofile image){
      api.updateUser(email, updateUser)
        .then(res => {
          that.props.updateUser();
          that.props.history.push(`/user/${email}`);
        });
    } else {
      that.getBase64(file, function(base64file) {
        updateUser.picturedata = base64file;
        updateUser.type = file.type;
        api.updateUser(email, updateUser)
          .then(res => {
            console.log(res)
            that.props.updateUser();
            that.props.history.push(`/user/${email}`);
          });
      });
    }

    //uploadImage, multer
    /*
    var formData = new FormData();
        formData.append("profilepic", this.state.file);
    
    fetch('/image/itme', {
    	method: 'POST',
    	//headers: {'Content-Type': 'multipart/form-data; boundary=---------------------------974767299852498929531610575'},
    	body: formData,
    });*/

    console.log("have send");

  }

  componentDidMount() {
    //load current profilepicture
    const email = this.props.location.pathname.split("/")[2];
    ;
    if (email !== this.props.user.email) {
      return (null);
    } else {
      document.getElementById("currentpic").src = this.state.picturedata;

      //isadmin abfangen?
      if (this.props.user.isTeacher) {
        document.getElementById("learn").style.display = 'none';
        document.getElementById("can").style.display = 'none';
        document.getElementById("teach").style.display = 'block';
      } else {
        document.getElementById("learn").style.display = 'block';
        document.getElementById("can").style.display = 'block';
        document.getElementById("teach").style.display = 'none';
      }
    }

  }


  render() {
    //grab state
    const {user, description, iCan, iLearn, iTeach, website, } = this.state;

    const email = this.props.location.pathname.split("/")[2];
    ;

    if (email !== user.email) {
      return (null);
    }

    //Checks if there is an active UserSession
    /*api.userSessionCheck()
    .then((status)=>{
    	if(status !== 200){
    		this.props.history.push("/");
    	}
    })*/

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
                        <div className="current_picture newpart"> <img className="fill" name="currentpic" id="currentpic" src="#" alt="your chosen profile image"></img></div>
                        <div className="form-group row newpart">
                          <input type="file" className="file HideTheUglyInput" name="profilepic" id="profilepic" onChange={ this.fileUploader } />
                          <label className="TheBeautifulInput" htmlFor="profilepic">
                            <img id="upload_icon" className="upload_icon" src={ Upload } alt="Upload Icon" /> Bild ändern
                          </label>
                        </div>
                        <div className="form-group row newpart">
                          <label htmlFor="description">Beschreibung</label>
                          <textarea className="form-control" name="description" rows="3" aria-describedby="Help1" value={ description } onChange={ this.onChange }></textarea>
                          <small id="Help1" className="form-text text-muted">Erzähle etwas über dich. Suchst du nach einer Gruppe zum lernen? Was sind deine Hobbies? </small>
                        </div>
                        <div className="form-group row newpart" id="can">
                          <label htmlFor="exampleInputEmail1">ich kann:</label>
                          <input type="text" className="form-control" name="iCan" aria-describedby="Help" value={ iCan } onChange={ this.onChange }></input>
                          <small id="Help" className="form-text text-muted">Erzähle, welche Sprachen du schon alle beherrschst. zum Beispiel Englisch B2 , Deutsch(Muttersprache)</small>
                        </div>
                        <div className="form-group row newpart" id="learn">
                          <label htmlFor="iLearn">ich lerne:</label>
                          <input type="text" className="form-control" name="iLearn" aria-describedby="Help3" value={ iLearn } onChange={ this.onChange }></input>
                          <small id="Help2" className="form-text text-muted">zum Beispiel Englisch B2, Deutsch , Arabisch</small>
                        </div>
                        <div className="form-group row newpart" id="teach">
                          <label htmlFor="iTeach">ich bringe bei:</label>
                          <input type="text" className="form-control" name="iTeach" aria-describedby="Help2" value={ iTeach } onChange={ this.onChange }></input>
                          <small id="Help2" className="form-text text-muted">zum Beispiel Englisch, Spanisch A2, Arabisch A1</small>
                        </div>
                        <div className="form-group row newpart" id="teach">
                          <label htmlFor="website">Website:</label>
                          <input type="text" className="form-control" name="website" value={ website } onChange={ this.onChange }></input>
                        </div>
                      </div>
                    </div>
                    <div className="row checkBoxes">
                      <div className="col">
                        <div className="form-group form-check row">
                          <input type="checkbox" className="form-check-input" id="Check1"></input>
                          <label className="form-check-label" htmlFor="exampleCheck1">Zeige deine Email-Adresse an</label>
                        </div>
                      </div>
                    </div>
                    <button type="button" href="/profile" className="btn btn-primary" onClick={ this.onSave }>Speichern</button>
                  </form>
                  <div className="row-12 text-muted text-right">
                    <div className="col-12">
                      <Link to={ `/user/${user.email}` }>zurück</Link>
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
