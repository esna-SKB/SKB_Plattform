import React from 'react';
import api from '../../api';


class Article extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		article: this.props.article
		};
		this.remove = this.remove.bind(this);
		this.comment = this.comment.bind(this);
	}

	remove = (event) => {
		api.deleteArticle(this.props.article._id).then(response => {
			if(response.success === true) {
				document.getElementById(this.props.article._id).outerHTML = "";
			}
		})
	}

	comment = (event) => {

		var div = document.getElementById(this.props.article._id)
		div.firstChild.nextSibling.style["display"] = 'block'

		var input = document.getElementById(this.props.article._id).firstChild.nextSibling.firstChild.firstChild
		input = input.firstChild.firstChild.firstChild
		console.log(input)
		input.onkeypress = function(e){
	    if (!e) e = window.event;
	    var keyCode = e.keyCode || e.which;
	    if (keyCode == '13'){
					console.log(input.value)

					let comment_div = document.createElement('DIV')
					let p = document.createElement('p')
					p.innerHTML = input.value
					let author = document.createElement('p')
					author.style["font-weight"] = 'bold'
					author.style["float"] = 'left'
					author.style["padding-right"] = '20px'
					author.innerHTML = 'me'

					comment_div.appendChild(author)
					comment_div.appendChild(p)

					input.parentElement.parentElement.prepend(comment_div)
					input.value= ''
					console.log(this.props)
	      return;
	    }
	  }

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
				<div id={this.state.article._id}>
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
							      <li className="remove" onClick={this.comment.bind(this)}><a>Kommentieren</a></li>
							    </ul>
								</div>
							</div>
						</div>
						<div className='col-12'>
							<h6>{article.headline}</h6>
							<p style={{color: '#a9a8a8'}}>{article.text}</p>
						</div>
    </div>

		<div className="comtained border row" style={{display: 'none'}}>
			<div className="col-sm-12">
			<div className="panel panel-white post">
					<div className="post-comments">
							<div className="input-group">
									<input className="form-control comment-input" placeholder="Add a comment..." type="text"/>
									<span className="input-group-addon">
											<a href="#"><i className="fa fa-check"></i></a>
									</span>
							</div>

							</div>
					</div>
			</div>


					</div>
				</div>
		 	);
		}
		else {
			return(
				<div id={this.state.article._id}>
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
							      <li className="remove" onClick={this.remove.bind(this)}><a>löschen</a></li>
										<li className="remove" onClick={this.comment.bind(this)}><a>Kommentieren</a></li>
							    </ul>
								</div>
							</div>
						</div>
						<div className='col-12'>
							<h6>{article.headline}</h6>
							<p style={{color: '#a9a8a8'}}>{article.text}</p>
						</div>
					</div>

					<div className="comtained border row" style={{display: 'none'}}>
							<div className="col-sm-12">
							<div className="panel panel-white post">
								<div className="post-comments">
										<div className="input-group">
												<input className="form-control comment-input" placeholder="Add a comment..." type="text"/>
												<span className="input-group-addon">
														<a href="#"><i className="fa fa-check"></i></a>
												</span>
										</div>
								</div>
							</div>
					</div>
					</div>

				</div>
				);
		}
	}

}

export default Article;
