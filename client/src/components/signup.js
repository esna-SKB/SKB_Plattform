import React, { Component } from 'react';
import '../main.css';
import Logo from'../img/esna.png';
import Classimg from'../img/nathan-dumlao-572049-unsplash.jpg';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  // componentDidMount() {
  //     const obj = getFromStorage('the_main_app');
  //     if (obj && obj.token) {
  //       const { token } = obj;
  //       // Verify token
  //       fetch('/api/account/verify?token=' + token)
  //         .then(res => res.json())
  //         .then(json => {
  //           if (json.success) {
  //             this.setState({
  //               token,
  //               isLoading: false
  //             });
  //           } else {
  //             this.setState({
  //               isLoading: false,
  //             });
  //           }
  //         });
  //     } else {
  //       this.setState({
  //         isLoading: false,
  //       });
  //     }
  //   }

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

      if (signUpFirstNameValid.value.length == 0){

        //fehlermeldung für den Nutzer

        signUpFirstNameValid.style.color = 'red';

        console.log('false')

        return false;

      }
	  
	let signUpLastNameValid = document.getElementById("lastName");

      if (signUpLastNameValid.value.length == 0){

	    //fehlermeldung für den Nutzer

	    signUpLastNameValid.style.color = 'red';

	    console.log('false')

	    return false;

      }
	  
	let signUpEmailValid = document.getElementById("email");

      if (signUpEmailValid.value.match(/^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){

        //fehlermeldung für den Nutzer

        signUpEmailValid.style.color = 'red';

        console.log('false')

        return false;

      }
	  
	let signUpPasswordValid = document.getElementById("password");

      if (signUpPasswordValid.value.length == 0){

	    //fehlermeldung für den Nutzer

	    signUpPasswordValid.style.color = 'red';

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

    this.setState({
      isLoading: true,
    });

    console.log(this.state)

    // Post request to backend
    fetch('/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstname: signUpFirstName,
        lastname: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
    .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  }

  render() {

    const {
      isLoading,
      token,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    return (
      <div className="row">

      <div className="col-6">
        <img src={Classimg} style={{width: '100%', height: '100%'}} alt="classroom"/>
      </div>

      <div className="col-6">
        <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>
        <p className="loginheadline">Bitte tragen Sie ihre Konto Informationen ein</p>

        <div className="center namefield">
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
}

export default Signup;
