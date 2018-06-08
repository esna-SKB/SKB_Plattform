import React from 'react';

import Article from './article';

class Newsfeed extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}



	render(){
		return(
			<div className='container' id="userposts">
			<Article/>
			</div>
			);
	}
}


export default Newsfeed; 