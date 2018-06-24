import React from 'react';
// import api from '../../api';
import axios from'axios';


class Article extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		article: this.props.article
		};
	}


	/*encoder = () => {



		var arrayBuffer = Buffer.from(this.state.article.data, 'binary').toString('base64');

		let u8 = new Uint8Array(arrayBuffer)
	    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
	    let mimetype= this.state.article.type;
	    //console.log(arrayBuffer)
	    //document.getElementById("myimage") = b64encoded;
	    return "data:"+mimetype+";base64"+arrayBuffer
	}*/

	img(){
		var base64file = this.state.article.data
		//document.body.appendChild(image);
	    //console.log(arrayBuffer)
	    //console.log(arrayBuffer);
	    if(this.state.article.type === ""){

	    } else
	    if(this.state.article.type.includes("image")){
	    	return(<img src={base64file} className="img-rounded img-fluid" alt="Image"/>)
	    }
	    else {
			return(

				//<img src={base64file} className="img-rounded img-fluid" alt="Image template"/>
				//<div className="embed-responsive embed-responsive-16by9">
				// 	<iframe className="embed-responsive-item" src={base64file} allowFullScreen></iframe>
				//</div>


				<div className="embed-responsive embed-responsive-16by9">
				    <object className="embed-responsive-item" data={base64file} type="application/pdf" internalinstanceid="9" title="pdf">
				        <p>Your browser isnt supporting embedded pdf files. You can download the file
				            <a href="/media/post/bootstrap-responsive-embed-aspect-ratio/example.pdf">here</a>.</p>
				    </object>
				</div>


			)
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
							
							{this.img()}
							
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
							{this.img()}
						</div>
					</div>
				</div>
				);
		}
	}

}

export default Article;
