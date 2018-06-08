import React from 'react';

class Groups extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}



	render(){
		return(
			<div>
			 <div className="box-title">
	            Gruppen
	          </div>
			</div>
			);
	}
}

export default Groups; 