import React, { Component } from 'react';

import '../../main.css';

import Logo from'../../img/esna.png';
//import Classimg from'../../img/chinese2-min.png';

import { setInStorage } from '../../utils/storage';

import cookie from 'react-cookies'
import { updateTimeSec } from '../../utils/userSessionHelper'

const api = require('../../api');



class Login extends Component {



  constructor(props) {

    super(props);
    this.state = {
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      errorMessage: '',
      infoMessage: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);

    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
	
  }




  componentDidMount() {

    if (this.props.location.state){
      if (this.props.location.state.infoMessage === "Password changed"){
        this.setState({
          infoMessage : "Dein Passwort wurde geändert. Du kannst dich jetzt mit deinem neuen Passwort einloggen."
        });
      }
      else if (this.props.location.state.infoMessage === "Account verified"){
        this.setState({
          infoMessage : "Danke für die Bestätigung deines Benutzerkontos. Du kannst dich jetzt einloggen."
        });
      }
    }
  }



  onTextboxChangeSignInEmail(event) {

    this.setState({

      signInEmail: event.target.value,

    });

  }



  onTextboxChangeSignInPassword(event) {

    this.setState({

      signInPassword: event.target.value,

    });

  }



  onSignIn() {

      let signUpEmailValid = document.getElementById("email");

      //email form validation
      if (signUpEmailValid.value.match(/^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){
        signUpEmailValid.style.color = 'red';
        signUpEmailValid.classList.add('errorshake');
        document.getElementById("errorMessage").setAttribute("style", "margin-top:-43px;");
        setTimeout(function() {
          let signUpEmailValid = document.getElementById("email");
          signUpEmailValid.classList.remove("errorshake");
          }
        , 500);

        this.setState({
        errorMessage : "Bitte gib eine gültige E-Mail Adresse an."
        });
        return false;
      }

      let signUpPasswordValid = document.getElementById("password");

      //password form validation
      if (signUpPasswordValid.value.length === 0){
	    signUpPasswordValid.style.color = 'red';
      document.getElementById("errorMessage").setAttribute("style", "margin-top:-43px;");

      signUpPasswordValid.classList.add('errorshake');
        setTimeout(function() {
          let signUpPasswordValid = document.getElementById("password");
          signUpPasswordValid.classList.remove("errorshake");
          }
        , 500);

        this.setState({
          errorMessage : "Bitte gib ein Passwort ein."
        });
  	    return false;
        }

    // Grab state

    const {

      signInEmail,

      signInPassword,

    } = this.state;

    // Post request to backend

      api.signIn(signInEmail, signInPassword).then(json => {

        console.log('json', json);

        if (json.success === true) {

          setInStorage('login_token', { token: json.token });
          //user registered & verified and correct password -> login successful
          fetch('/userSession/'+signInEmail, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }
          ).then(res => res.json())
          .then(json => {
            //console.log(jsonnn.token);
            let str = json.token;
            cookie.save('userID', str, {expires: updateTimeSec(60*20), path: '/'});
          })
          .then(()=>this.props.updateEmail(signInEmail));

          this.setState({

            signInError: json.message,

            token: json.token,

          });

        } else {
          //user not registered
          if(json.message === 'No account or wrong Password'){
            this.setState({
              signInError: json.message,

              infoMessage: "",
              errorMessage: "E-Mail Adresse oder Passwort nicht korrekt."
            });
          }
          else if(json.message === 'User not verified yet'){
            this.setState({
              signInError: json.message,
              infoMessage: "",
              errorMessage: "Du hast Dein Konto noch nicht bestätigt. Solltest du keinen Link erhalten haben, kannst Du ihn <a href='/resend' >hier</a> noch einmal anfordern."
            });
          }
        }
      });
  }

  render() {

    const {

      token,

      signInError,

      signInEmail,

      signInPassword,

    } = this.state;
    return (

        <div className='center_loginform'>
              <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>

              <p className="loginheadline">Die Lernplattform für Lehrer und Studenten</p>

              <p className = "errorMessage" id="errorMessage" dangerouslySetInnerHTML={{ __html: this.state.errorMessage }}></p>
              <p className = "infoMessage">{this.state.infoMessage}</p>


              <input id="email" className="input_login" type="text" placeholder="Deine Email Adresse" name="email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/><br />

              <input id="password" className="input_login" type="password" placeholder="Passwort" name="password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br />

              <button className="center login_button" style={{marginTop:'10px', marginBottom: '10px'}} onClick={this.onSignIn}>login</button>

              <p style={{color:'#a9a8a8',textAlign: 'center'}}><a href="/forgotPassword">Passwort vergessen?</a></p>
        </div>
    );

  }

}


export default Login;
