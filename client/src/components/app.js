import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}

	getEmail = (email) => {
		this.state({
			myEmail: email
		}); 
	}


	render(){
		return(
			<div>
				<InnerPage myEmail={this.state.myEmail}/>
				<OuterPage getEmail= {this.getEmail}/>
			</div>
			);
	}
}

export default App; 