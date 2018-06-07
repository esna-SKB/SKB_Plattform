import React, { Component } from 'react';

import '../main.css';

import Logo from'../img/esna.png';

import Classimg from'../img/chinese2-min.png';

import { setInStorage, getFromStorage, } from '../utils/storage';

import cookie from 'react-cookies'
import { checkUserSession, updateUserSession, deleteUserSession, getToken, updateTimeSec } from '../utils/userSessionHelper'



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

  componentWillMount(){

      //Checks if there is an active UserSession
      //console.log('Returned Bool' + checkUserSession(cookie.load('userID')));

      fetch('/userSession/check', {

      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( { token: cookie.load('userID') } )
      }).then (res => {

        if(res.status === 200){
          cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})
          this.props.history.push("/timeline");
        }
      });

      // if(checkUserSession(cookie.load('userID'))){
      //   this.props.history.push("/timeline");
      // }


      // if(checkUserSession(cookie.load('userID'))){
      //   this.props.history.push("/timeline");
      // }
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

        if (json.success === true) {

          setInStorage('login_token', { token: json.token });
          //user registered & verified and correct password -> login successful

          
          //Cookie mit email und expire in Sekunden -> später ändern
          /*fetch('/user/'+signInEmail, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    }
          ).then(ress => ress.json())
          .then(jsonn => {cookie.save('userID',jsonn.email, { expires: updateTimeSec(40), path: '/'})});
          */

          //cookie.save('userId', getToken(signInEmail), { expires: updateTimeSec(40), path: '/'});
          //onsole.log(getToken(signInEmail));


          //komischer Weise hat 'str' als return Wert aus 'UserSessionHelper' nur ein 'undefined geliefert'
          fetch('/userSession/'+signInEmail, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }
          ).then(resss => resss.json())
          .then(jsonnn => {
            //console.log(jsonnn.token);
            let str = jsonnn.token;
            cookie.save('userID', str, {expires: updateTimeSec(60), path: '/'});
          });

          this.setState({

            signInError: json.message,

            signInPassword: '',

            signInEmail: '',

            token: json.token,

          });
          //warte kurz weil cookie nicht so schnell speichert?
          //sleep(2000);
          document.location.reload();
          //this.props.history.push("/timeline");

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


      <div className="row heigh100" style={{backgroundColor: '#f7f8f9', backgroundImage: 'url('+Classimg+')', backgroundSize: '100%'}}>



      <div className="col-12" style={{padding: '10px 10px 10px 25px'}}>


        <a href="/signup" className='whitehover' style={{color: 'white !important'}}><div className='registrieren_botton'>Registrieren
        </div></a>
        <div><p style={{float: 'right',paddingTop: '23px', fontSize: '16px'}}>noch kein Mitglied?</p></div>
        
        <div className='center_loginform'>
              <img id="logo" className="esna_logo" src={Logo} alt="classroom"/>

              <p className="loginheadline">Die Lernplattform für Lehrer und Studenten</p>

              <p className = "errorMessage" dangerouslySetInnerHTML={{ __html: this.state.errorMessage }}></p>
              <p className = "infoMessage">{this.state.infoMessage}</p>


              <input id="email" className="input_login" type="text" placeholder="Deine Email Adresse" name="email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/><br />

      				<input id="password" className="input_login" type="password" placeholder="Passwort" name="password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br />

      				<button className="center login_button" style={{marginTop:'10px', marginBottom: '10px'}} onClick={this.onSignIn}>login</button>

              <p style={{color:'#a9a8a8',textAlign: 'center'}}><a href="/forgotPassword">Passwort vergessen?</a></p>
        </div>

        <div className="center loginfooter_parent">
            <p className="loginfooter">Impressum</p> <p>Datenschutz</p>
        </div>

      </div>



      </div>

    );

  }

}



export default Login;
