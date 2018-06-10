import React from 'react';


class Threads extends React.Component {
	constructor(props){
	super(props);
	}



	render(){
		return(
			<div></div>
			);
	}
}

export class Messages extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		}; 
	}


	render(){
		return(
			<Threads/>
			);
	}
}
