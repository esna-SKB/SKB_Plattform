import React from 'react';
import '../css/timeline.css';

import InnerPage from './innerPage';
import OuterPage from './outerPage';

import cookie from 'react-cookies';
const api = require('../api');

class App extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: "",
		email:""
		}; 
	}
	componentDidMount(){
		if(this.state.user===""){
			var token = cookie.load('userID');

			api.getEmailFromUserSession(token)
			.catch(err =>{console.log(err)})
			.then(email => api.getUser(email.userId))
			.then(user => {
				this.setState({
				user: user
				})
			});
			
		}
	}
	/*getEmail = (email) => {
		this.state({
			user: api.getUser(email)
		}); 
	}*/


	render(){
		console.log("app: "+this.props.location);
		console.log(this.state.user); 
		if(typeof this.state.user.email == "string" && this.state.user!=""){
			return(
				<InnerPage location={this.props.location} user={this.state.user}/>
			);
		} else {
			return(
				<OuterPage location={this.props.location} history={this.props.history}/>
			);
			
		}
		
	}
}

export default App; 