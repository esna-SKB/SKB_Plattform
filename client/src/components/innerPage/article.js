import React from 'react';



class Article extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		article: this.props.article
		};
	}


	render(){
		const article = this.props.article;
		const d = article.created_at.toString();
		var date = new Date(d);

		return(
			<div>
				<div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
				 	<div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
						<div className='row'>
							<div className='col-9' style={{textTransform: 'capitalize'}}>
							<p>{article.author.firstname} {article.author.lastname}</p>
							<p>{article.course.name}</p>
							</div>
							<div className='col-3'>
								<time style={{float: 'right'}}>{date.toLocaleString()}</time>
							</div>
						</div>
					</div>
					<div className='col-12'>
						<h6>{article.headline}</h6>
						<p style={{color: '#a9a8a8'}}>{article.text}</p>
					</div>
				</div>
			</div>
	 	);
	}

}

export default Article;
