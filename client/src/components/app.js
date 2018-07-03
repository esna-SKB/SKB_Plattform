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
	this.updateUser = this.updateUser.bind(this); 

	this.state = {
		user: {},
		email:"",
		valide: false,
		loaded: false
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
			valide:true,
			loaded: true
			}, ()=> console.log(this.state.user))
		});
	}

	componentDidMount(){
		//console.log(this.state.user, typeof this.state.user);
		if (this.state.valide===false) {
			console.log("WillUpdating")
			api.userSessionCheck()
			.then(val=> {
				if(val===200){
					this.updateUser();
				}else{
					this.setState({loaded:true})
				}
			})
		}
	}


	render(){
		const {
			loaded,
			valide,
			user
		} = this.state; 
		//console.log(this.state.user)
		//api.userSessionCheck().then(val=>{val==200})
		//console.log("bedingung: "+ typeof(this.state.user) +" "+this.state.user.email)
		if(loaded && !valide){
			return(
				<OuterPage updateEmail={this.updateEmail} location={this.props.location} history={this.props.history}/>
			);
		} 
		else if(valide && user.email !== undefined){
			return(
				<InnerPage user={user} updateUser={this.updateUser} handleLogout={this.handleLogout}/>
			);
		} else {
			return (null); 
		}

	}
}

export default App;
