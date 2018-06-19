import React from 'react';
import '../css/timeline.css';

import InnerPage from './innerPage';
import OuterPage from './outerPage';

import cookie from 'react-cookies';
import { deleteUserSession } from '../utils/userSessionHelper';

const api = require('../api');

class App extends React.Component {
	constructor(props){
	super(props);
	this.updateEmail = this.updateEmail.bind(this);
	this.handleLogout = this.handleLogout.bind(this);

	this.state = {
		user: {},
		email:"",
		valide: false
		};
	}

	handleLogout(){
		deleteUserSession(cookie.load('userID'));
		this.setState({valide:false});  //just to reload the root Component App
	}

	updateEmail(email) {
		console.log("App: " + email)
		this.setState({email: email},
			() => console.log("Email this.state: "+ this.state.email))
		this.updateUser();
	}

	updateUser() {
		console.log("updateUser")
		var token = cookie.load('userID');

		api.getEmailFromUserSession(token)
		.catch(err =>{console.log(err)})
		.then(email => api.getUser(email.userId))
		.catch(err => console.log(err))
		.then(user => {
			this.setState({
			user: user,
			valide:true
			}, ()=> console.log(this.state.user))
		});
	}

	componentWillMount(){
		//console.log(this.state.user, typeof this.state.user);
		if (this.state.valide===false) {
			console.log("WillUpdating")
			api.userSessionCheck()
			.then(val=> {
				if(val===200){
					this.updateUser();
				}
			})
		}
	}


	render(){

		//console.log(this.state.user)
		//api.userSessionCheck().then(val=>{val==200})
		//console.log("bedingung: "+ typeof(this.state.user) +" "+this.state.user.email)
		if(this.state.valide && typeof this.state.user !== 'undefined' && this.state.user.email !== undefined){
			return(
				<InnerPage  user={this.state.user} handleLogout={this.handleLogout}/>
			);
		} else {
			return(
				<OuterPage updateEmail={this.updateEmail} location={this.props.location} history={this.props.history}/>
			);

		}

	}
}

export default App;
