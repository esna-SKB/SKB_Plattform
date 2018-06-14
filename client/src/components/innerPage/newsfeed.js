import React from 'react';

import Article from './article';
import api from '../../api';

class Newsfeed extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user,
		articles: []
		}
	}

	componentDidMount() {
	api.getTimelineArticles(this.props.user.email)
	.then(res => {  
		this.setState({
		articles: res.map((e)=>{ return( <Article key={e._id} article={e}/>);})
		})
	})
	}

	render(){
		return(
			<div className='container' id="userposts">
			{this.state.articles}
			</div>
			);
	}
}


export default Newsfeed;
