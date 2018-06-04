import React, { Component } from 'react';

import '../main.css';

import Logo from'../img/esna.png';

import Classimg from'../img/nathan-dumlao-572049-unsplash.jpg';

class ForgotPassword extends Component {

  constructor(props) {

    super(props);

    this.state = {
      requestSent: false,
      requestEmail: '',
      infoMessage: 'Bitte gib hier deine E-Mail an. Wir senden dir einen Link zu, mit dem du dein Passwort zurücksetzen kannst.',
      errorMessage: ''
    };

    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onTextboxChangeEmail(event) {

    this.setState({
      requestEmail: event.target.value,
    });

  }

  onSubmit() {

    let requestEmail = document.getElementById("email");

    //check if Email Adress is a valid Email
    if (requestEmail.value.match(/^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){
      requestEmail.style.color = 'red';
      this.setState({
      errorMessage : "Bitte gib eine gültige E-Mail Adresse an."
      });
      return;
    }
    // Post request to backend
    fetch('/account/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: requestEmail.value
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success === true) {
          this.setState({
            requestSent: true,
            errorMessage: '',
            infoMessage: "Du hast eine E-Mail mit einem Link, mit dem du dein Passwort zurücksetzen kannst, bekommen."
          });
        }
      });
    }

  render() {



    const {
      requestSent,
      requestEmail
    } = this.state;

    if (requestSent){
      return (
          <div className="row">
          <div className="col-6">
            <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
          </div>
          <div className="col-6">
            <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
            <p className="loginheadline">Passwort vergessen?</p>
            <p className = "infoMessage">{this.state.infoMessage}</p>
            <p className = "errorMessage">{this.state.errorMessage}</p>
            <p style={{color:'#a9a8a8',textAlign: 'center', paddingTop: '10px'}}><a href="/">Zurück zum Login</a></p>
            <div className="center loginfooter_parent">
            <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
            </div>
          </div>
          </div>
        );
    }
    else{
      return (
          <div className="row">
          <div className="col-6">
            <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
          </div>
          <div className="col-6">
            <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
            <p className="loginheadline">Passwort vergessen?</p>
            <p className = "infoMessage">{this.state.infoMessage}</p>
            <p className = "errorMessage">{this.state.errorMessage}</p>
            <input id="email" className="input_login" type="text" placeholder="Deine Email Adresse" name="email" value={requestEmail} onChange={this.onTextboxChangeEmail}/><br />
    				<button className="center login_button" style={{marginTop:'20px'}} onClick={this.onSubmit}>Absenden</button>
            <p style={{color:'#a9a8a8',textAlign: 'center', paddingTop: '10px'}}><a href="/">Zurück zum Login</a></p>
            <div className="center loginfooter_parent">
            <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
            </div>
          </div>
          </div>
        );
    }
  }

}

export default ForgotPassword;
