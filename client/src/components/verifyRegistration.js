import { Component } from 'react';

import '../main.css';

const qs = require('query-string');

class VerifyRegistration extends Component {

  constructor(props) {

    super(props);



    this.state = {

      token: '',

      userId: '',

      signInError: '',

      signInEmail: '',

      signInPassword: '',

      errorMessage: '',

      infoMessage: ''

    };
  }
    componentDidMount(){

      var registrationToken = qs.parse(this.props.location.search).token

      fetch('/account/registration/verify', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          token: registrationToken
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          this.props.history.push({pathname : "/", state : {infoMessage: "Account verified"}});
        });
    };


    render(){
    return null
    }
};


export default VerifyRegistration;
