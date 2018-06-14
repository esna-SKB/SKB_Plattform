import React from 'react';

import Article from './article';

class Newsfeed extends React.Component {

	render(){
		return(
			<div className='container' id="userposts">
			<Article user={this.props.user} />
			</div>
			);
	}
}


export default Newsfeed;
