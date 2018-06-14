import React from 'react';
import api from '../../api';


class Article extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		articles: []
		};
	}

	componentDidMount() {
	var articleslist = [];
	api.getAllCoursesOfUser(this.props.user.email).then(res => {
			res.forEach(function(course) {
				api.getAllArticlesOfCourse(course.name).then(res1 => {
					res1.forEach(function(onearticle){articleslist.push(onearticle)})
				});
			});
  })

	this.setState({
		articles: articleslist
	})

}
	render(){
		return(
<div>
			{this.state.articles.map(function(article, i) {
				 return <div key={i} className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
				 	<div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
								<div className='row'>
										<div className='col-6' style={{textTransform: 'capitalize'}}>
										{article.author.firstname} {article.author.lastname}
										 </div>
										 <div className='col-6'>
														<p style={{float: 'right'}}>10 min</p>
										 </div>
								 </div>
						 </div>
						 <div className='col-12'>
										<p style={{color: '#a9a8a8'}}>{article.text}</p>
							</div>
					</div>
			})}
</div>
	 );
	}

}

export default Article;
