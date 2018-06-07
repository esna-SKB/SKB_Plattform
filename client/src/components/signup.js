import React, { Component } from 'react';
import '../main.css';
import Logo from'../img/esna.png';
import Classimg from'../img/nathan-dumlao-572049-unsplash.jpg';

import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper';
import cookie from 'react-cookies';

const api = require('../api');

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 0,
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      errorMessage: '',
      infoMessage: ''
    };

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  // componentDidMount(){
  //   //Checks if there is an active UserSession
  //   fetch('/userSession/check', {
  //
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify( { token: cookie.load('userID') } )
  //   }).then (res => {
  //
  //     if(res.status == 401){
  //
  //       cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})
  //
  //       this.props.history.push("/timeline");
  //     }
  //   });
  // }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {

	let signUpFirstNameValid = document.getElementById("firstName");

      if (signUpFirstNameValid.value.length === 0){

        //fehlermeldung für den Nutzer



        signUpFirstNameValid.style.color = 'red';

        this.setState({
          errorMessage : "Bitte fülle alle Felder aus."
        });

        console.log('false')

        return false;

      }

	let signUpLastNameValid = document.getElementById("lastName");

      if (signUpLastNameValid.value.length === 0){

	    //fehlermeldung für den Nutzer

	    signUpLastNameValid.style.color = 'red';

      this.setState({
      errorMessage : "Bitte fülle alle Felder aus."
      });

	    console.log('false')

	    return false;

      }

	let signUpEmailValid = document.getElementById("email");

      if (signUpEmailValid.value.match(/^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){

        //fehlermeldung für den Nutzer

        signUpEmailValid.style.color = 'red';

        this.setState({
        errorMessage : "Bitte gib eine gültige E-Mail Adresse an."
        });

        return false;

      }

	let signUpPasswordValid = document.getElementById("password");

      if (signUpPasswordValid.value.length < 8){

	    //fehlermeldung für den Nutzer

	    signUpPasswordValid.style.color = 'red';

      this.setState({
        errorMessage : "Dein Passwort muss aus mind. acht Zeichen bestehen."
      });

	    console.log('false')

	    return false;

      }
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    console.log(this.state)

    // Post request to backend
    api.signUp(signUpFirstName, signUpLastName, signUpEmail, signUpPassword)
      .then(json => {
        console.log('json', json);
        console.log(json.success);
        if (json.success === true) {
          this.setState({
            status: 1,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          if (json.message === 'Error: Account not verified yet.'){
            this.setState({
              status: 2,
              signUpEmail: '',
              signUpPassword: '',
              errorMessage: "Du hast deinen Account noch nicht bestätigt."
            });
          }
          else if(json.message === 'Error: Account already exist.')
          this.setState({
            status: 3,
            signUpEmail: '',
            signUpPassword: '',
            errorMessage: 'Ein Account mit dieser E-Mail Adresse exisitert bereits bei uns.'
          });
        }
      });
  }

  render() {

    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    //Checks if there is an active UserSession
    fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {

      if(res.status == 200){

        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60*20), path: '/'})

        this.props.history.push("/timeline");
      }
    });

    //when first visiting the page
    if (this.state.status === 0){
      return (

        <div className="row">

        <div className="col-6">
          <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
        </div>

        <div className="col-6">
          <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
          <p className="loginheadline">Bitte trag hier Deine Kontoinformationen ein</p>

          <p className = "errorMessage">{this.state.errorMessage}</p>

          <div className="namefield">
            <input id="firstName" className="input_login firstname" type="text" placeholder="Vorname" name="vorname" value={signUpFirstName}  onChange={this.onTextboxChangeSignUpFirstName}/>
            <input id="lastName" className="input_login lastname" type="text" placeholder="Nachname" name="nachname" value={signUpLastName}  onChange={this.onTextboxChangeSignUpLastName}/><br />
          </div>

          <input id="email" className="input_login" type="text" placeholder="Email Adresse" name="email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail}/><br />
  				<input id="password" className="input_login" type="password" placeholder="Passwort" name="password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword}/><br />
  				<button className="center login_button" style={{marginTop:'20px'}} type="button" value="Login" onClick={this.onSignUp}>Konto erstellen</button>

          <p className="backtologin"><a href="/">zurück zum login</a></p>
          <div className="center loginfooter_parent">
          <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
          </div>
        </div>
        </div>
      );
    }
    //when Registration was successful and Link was sent
    else if (this.state.status === 1){
      return (

        <div className="row">

        <div className="col-6">
          <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
        </div>

        <div className="col-6">
          <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
          <p className="infoMessage">Danke für Deine Registrierung!</p>
          <p className="infoMessage">Wir haben Dir eine E-Mail mit einem Link zum Bestätigen Deines Kontos geschickt.</p>

          <p className="backtologin"><a href="/">zurück zum login</a></p>

          <div className="center loginfooter_parent">
          <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
          </div>
        </div>
        </div>
      );
    }
    //if account is not verified yet
    else if (this.state.status === 2){
      return (
        <div className="row">

        <div className="col-6">
          <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
        </div>

        <div className="col-6">
          <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
          <p className="errorMessage">{this.state.errorMessage}</p>
          <p className="backtologin"><a href="resend">Link nochmal senden</a></p>
          <p className="backtologin"><a href="/">zurück zum login</a></p>

          <div className="center loginfooter_parent">
          <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
          </div>
        </div>
        </div>
      );
    }
    //if account already exists and also is verified
    else if (this.state.status === 3 ){
      return (
        <div className="row">

        <div className="col-6">
          <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
        </div>

        <div className="col-6">
          <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
          <p className="errorMessage">{this.state.errorMessage}</p>
          <p className="backtologin"><a href="/forgotPassword">passwort vergessen?</a></p>
          <p className="backtologin"><a href="/">zurück zum login</a></p>

          <div className="center loginfooter_parent">
          <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default Signup;
