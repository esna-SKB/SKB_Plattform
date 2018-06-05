import React, { Component } from 'react';

import '../main.css';

import Logo from'../img/esna.png';

import Classimg from'../img/nathan-dumlao-572049-unsplash.jpg';

const qs = require('query-string');

class ResetPassword extends Component {



  constructor(props) {

    super(props);



    this.state = {

      token: '',

      userId: '',

      signInError: '',

      signInEmail: '',

      signInPassword: '',

      errorMessage: '',

      infoMessage: 'Gib hier dein neues Passwort ein.'

    };

    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

  }

  onTextboxChangeSignInPassword(event) {

    this.setState({

      signInPassword: event.target.value,

    });

  }

  onSubmit() {


      let userId = qs.parse(this.props.location.search).id

      let signUpPasswordValid = document.getElementById("password");

      //password validation
      if (signUpPasswordValid.value.length < 8){
	       signUpPasswordValid.style.color = 'red';
         this.setState({
              errorMessage : "Dein Passwort muss aus mind. acht Zeichen bestehen."
         });
	       console.log('false')
	       return false;
      }

      // Grab state

      const {

        signInPassword,

      } = this.state;


      this.setState({

        isLoading: true,

      });

      // Post request to backend
      console.log(this.props);
      fetch('/account/resetPassword', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          id: userId,
          password: signInPassword
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          this.props.history.push({pathname : "/", state : {infoMessage: "Password changed"}});
        });
    };

  render() {

    const {

      signInPassword,

    } = this.state;

    return (

      <div className="row">

      <div className="col-6">

        <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>

      </div>

      <div className="col-6">

        <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>

        <p className="loginheadline">Die Lernplattform für Lehrer und Studenten</p>

        <p className = "errorMessage">{this.state.errorMessage}</p>
        <p className = "infoMessage">{this.state.infoMessage}</p>

        <input id="password" className="input_login" type="password" placeholder="Passwort" name="password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br />

				<button className="center login_button" style={{marginTop:'20px'}} onClick={this.onSubmit}>Bestätgigen</button>

        <div className="center loginfooter_parent">

        <p className="loginfooter">Impressum</p> <p>Datenschutz</p>

        </div>

      </div>



      </div>

    );

  }

}



export default ResetPassword;
