import React from 'react';
import { Link } from 'react-router-dom'
import '../../css/messages.css';

const api = require('../../api');

class ElementPartner extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			partner: ""
		}
	}
	componentDidMount(){
		api.getUser(this.props.partner)
		.then( res =>{
			this.setState({
				partner : res
			})
		})
	}
	render(){
		return (
		<div className="contentTeacherinfo">
		<Link to={`/messages/${this.state.partner.email}`}>
						<div style={{clear: "both"}} className="contentTeacherinfo">
							<img className="contentTeacherinfo" src={this.state.partner.picturedata} alt="profilepicture"/>
							<h4 className="contentTeacherinfo">{this.state.partner.firstname} {this.state.partner.lastname}</h4>
						</div>
		 </Link>
		 </div>
		);
	}
}
class ConversationPartners extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			conversationPartners: []
		}
	}
	componentDidMount(){
		api.getConversationPartners(this.props.user.email)
		.then( res =>{
			this.setState({
				conversationPartners : res.map((e)=>{ return( <ElementPartner key={e} user={this.props.user} partner={e}/>);})
			})
		})
	}
	render(){
		return(
			<div>{this.state.conversationPartners}</div>
			);
	}
}
export class MessageList extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		};
	}

	render(){
		return(
			<div className="container" style={{backgroundColor : 'white'}}>
				<div>
				<div>
						<ConversationPartners user={this.props.user}/>
					</div>
				</div>
			</div>
		)
	}
}

export default MessageList
