import React, { Component } from 'react';

import '../main.css';

import Logo from'../img/esna.png';

import Classimg from'../img/nathan-dumlao-572049-unsplash.jpg';

import { setInStorage, getFromStorage, } from '../utils/storage';





class Login extends Component {



  constructor(props) {

    super(props);



    this.state = {

      isLoading: true,

      token: '',

      signInError: '',

      signInEmail: '',

      signInPassword: '',

      errorMessage: ''

    };



    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);

    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  }




  /*
  componentDidMount() {

    const obj = getFromStorage('login_token');

    if (obj && obj.token) {

      const { token } = obj;

      // Verify token

      fetch('/account/verify?token=' + token)

        .then(res => res.json())

        .then(json => {

          if (json.success) {

            this.setState({

              token,

              isLoading: false

            });

          } else {

            this.setState({

              isLoading: false,

            });

          }

        });

    } else {

      this.setState({

        isLoading: false,

      });

    }

  }
 */






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

      if (signUpEmailValid.value.match(/^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){

        //fehlermeldung für den Nutzer

        signUpEmailValid.style.color = 'red';

        console.log('false')

        return false;

      }

      let signUpPasswordValid = document.getElementById("password");

      if (signUpPasswordValid.value.length === 0){

	    //fehlermeldung für den Nutzer

	    signUpPasswordValid.style.color = 'red';

	    console.log('false')

	    return false;

      }




    // Grab state

    const {

      signInEmail,

      signInPassword,

    } = this.state;



    this.setState({

      isLoading: true,

    });



    // Post request to backend

    fetch('/account/signin', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        email: signInEmail,

        password: signInPassword,

      }),

    }).then(res => res.json())

      .then(json => {

        console.log('json', json);

        if (json.success == true) {

          setInStorage('login_token', { token: json.token });
          //user registered & verified and correct password -> login successful
          this.setState({

            signInError: json.message,

            isLoading: false,

            signInPassword: '',

            signInEmail: '',

            token: json.token,

          });
          this.props.history.push("/timeline");

        } else {
          //user not registered
          if(json.message == 'No account or wrong Password'){
            this.setState({
              signInError: json.message,

              isLoading: false,
              errorMessage: "E-Mail Adresse oder Passwort nicht korrekt."
            });
          }
          else if(json.message == 'User not verified yet'){
            this.setState({
              signInError: json.message,

              isLoading: false,
              errorMessage: "Du hast Dein Konto noch nicht bestätigt. Solltest du keinen Link erhalten haben, kannst Du ihn <a>hier</a> noch einmal anfordern."
            });

          }


        }

      });

  }



  render() {



    const {

      isLoading,

      token,

      signInError,

      signInEmail,

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

        <input id="email" className="input_login" type="text" placeholder="Deine Email Adresse" name="email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/><br />

				<input id="password" className="input_login" type="password" placeholder="Passwort" name="password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br />

				<button className="center login_button" style={{marginTop:'20px'}} onClick={this.onSignIn}>login</button>



        <p style={{color:'#a9a8a8',textAlign: 'center', paddingTop: '10px'}}><a href="/signup">Konto erstellen</a></p>
        <p style={{color:'#a9a8a8',textAlign: 'center'}}><a>Passwort vergessen?</a></p>

        <div className="center loginfooter_parent">

        <p className="loginfooter">Impressum</p> <p>Datenschutz</p>

        </div>

      </div>



      </div>

    );

  }

}



export default Login;
