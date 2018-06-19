import React from 'react';
// import api from '../../api';


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

		var timeSince = (date) => {
			  var seconds = Math.floor((new Date() - date) / 1000);

			  var interval = Math.floor(seconds / 31536000);
			  if (interval > 1)
			    return "vor " + interval + " Jahre";

			  interval = Math.floor(seconds / 2592000);
			  if (interval > 1)
			    return "vor " + interval + " Monate";

			  interval = Math.floor(seconds / 86400);
			  if (interval >= 1) {
					if(interval = 1) return "vor " + interval + " Tag";
			    return "vor " + interval + " Tage";
				}

			  interval = Math.floor(seconds / 3600);
			  if (interval >= 1)
			    return "vor " + interval + " Stunden";

			  interval = Math.floor(seconds / 60);
			  if (interval > 1)
					return "vor " + interval + " Minuten";

			  return "vor " + Math.floor(seconds) + " Sekunden";
		}

		if(this.state.article.author.email !== this.props.user) {
			return(
				<div>
					<div className='row border' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
					 	<div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
							<div className='row'>
								<div className='col-6' style={{textTransform: 'capitalize'}}>
								<p>{article.author.firstname} {article.author.lastname}</p>
								<p>{ article.course.name}</p>
								</div>
								<div className='col-6'>
									<time style={{float: 'right'}}>{timeSince(date)}</time>
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
		else {
			return(
				<div>
					<div className='row border' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
					 	<div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
							<div className='row'>
								<div className='col-5' style={{textTransform: 'capitalize'}}>
								<p>{article.author.firstname} {article.author.lastname}</p>
								<p>{ article.course.name}</p>
								</div>
								<div className='col-6'>
									<time style={{float: 'right'}}>{timeSince(date)}</time>
								</div>
								<div className='col-1'>
									<button className="dropdown-toggle remove_button_arrow" type="button" data-toggle="dropdown"><h1 className="remove_article">...</h1></button>
									<ul className="dropdown-menu" style={{ marginTop: '-35px'}}>
							      <li className="remove"><a>löschen</a></li>
							    </ul>
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

}

export default Article;
