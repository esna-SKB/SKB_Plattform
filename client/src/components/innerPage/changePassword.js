import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/timeline.css';

const api = require('../../api');
//const qs = require('query-string');

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

    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }



  handleOldPassword(event) {
    this.setState({
      oldpassword: event.target.value,
    });
  }


  handleNewPassword(event) {
    this.setState({
      newpassword: event.target.value,
    });
  }

  handleCheckPassword(event) {
    this.setState({
      checkpassword: event.target.value,
    });
  }
  handleErrorMessage(str) {
    this.setState({
      errorMessage: str
    })
  }

  handleSubmit() {
    // Grab state
    const {oldpassword, newpassword, checkpassword, } = this.state;

    //password validation
    if (newpassword.length < 8) {
      this.handleErrorMessage("Dein Passwort muss aus mindesten acht Zeichen bestehen.");
      console.log("Dein Passwort muss aus mindesten acht Zeichen bestehen.");
      return false;
    }
    //check newpassword == checkpassword
    if (!(newpassword === checkpassword)) {
      this.handleErrorMessage("Neues Passwort stimmt nicht ueberein!");
      console.log("Neues Passwort stimmt nicht überein!");
      return false;
    }
    //check if old password is correct
    api.checkPassword(this.props.user.email, oldpassword)
      .then(json => {
        if (json.success === false) {
          this.handleErrorMessage("Falsches Passwort")
          console.log("wrong passwort");
          return false;
        } else {
          let userId = this.props.user._id;
          api.resetPassword(userId, newpassword).then(json => {
            if (json.success === true) {
              this.handleErrorMessage("Du hast dein Passwort erfolgreich geändert")
              console.log("Successfully change password");

            } else {
              this.handleErrorMessage("Dein Passwort konnte nicht geändert werden")
              console.log("fails to change passoword")
            }
          });
        }
      });




  }



  render() {

    const {oldpassword, newpassword, checkpassword, errorMessage} = this.state;

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
                    <h4 className="title"><strong>Passwort ändern</strong></h4>
                  </div>
                  <div className="text-danger">
                    { errorMessage }
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group row newpart">
                        <label htmlFor="oldpwd">altes Passwort eingeben:</label>
                        <input type="password" className="form-control" name="oldpassword" value={ oldpassword } onChange={ this.handleOldPassword }></input>
                      </div>
                      <div className="form-group row newpart">
                        <label htmlFor="newpwd">neues Passwort eingeben:</label>
                        <input type="password" className="form-control" name="newpassword" placeholder="mindestens 8 Zeichen" value={ newpassword } onChange={ this.handleNewPassword }></input>
                      </div>
                      <div className="form-group row newpart">
                        <label htmlFor="newpwd2">neues Passwort wiederholen:</label>
                        <input type="password" className="form-control" name="checkpassword" placeholder="mindestens 8 Zeichen" value={ checkpassword } onChange={ this.handleCheckPassword }></input>
                      </div>
                    </div>
                  </div>
                  <div className="row-12 text-muted text-left newpart">
                    <Link to={ `/forgotPassword` }>Passwort vergessen?</Link>
                  </div>
                  <button className="btn btn-primary" onClick={ this.handleSubmit }>Passwort ändern</button>
                  <div className="row-12 text-muted text-right">
                    <div className="col-12">
                      <Link to={ `/settings` }>zurück</Link>
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
