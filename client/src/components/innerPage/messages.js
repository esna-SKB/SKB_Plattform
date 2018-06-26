import React from 'react';
import { Link } from 'react-router-dom'
import '../../css/messages.css';

const api = require('../../api');

class ElementMessage extends React.Component{
	componentDidMount(){

	}
	render(){
		if(this.props.user.email == this.props.message.fromUser){
			return(

					<div className="col-message-sent">
						<div className="message-sent">
							<p>{this.props.message.text}</p>
						</div>
					</div>
			)
		}
		else{
			return(
			<div className="col-message-received">
				<div className="message-received">
					<p>{this.props.message.text}</p>
					</div>
			</div>
			)
		}
	}
}

class Conversation extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			conversationMessages : []
		}
	}
	componentDidMount(){
		console.log(this.props.user.email)
		console.log(this.props.partnerEmail)
		api.getConversation(this.props.user.email, this.props.partnerEmail)
		.then( res => {
			console.log(res)
			this.setState({
				conversationMessages : res.map((e)=>{ return( <ElementMessage key={e._id} user={this.props.user} message={e}/>);})
			})
		})
	}
	render(){
		return (
			<div className="tab-pane" style={{height:'550px'}}>
				<div className="grid-message">
					{this.state.conversationMessages}
				</div>
			</div>
		);
	}
}

export class Messages extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		partnerEmail: window.location.pathname.split("/")[2]
		};
	}

	componentDidMount(){
			this.setState({

			})
	}

	sendMessage = (e) =>{
		if(e.key=== "Enter"){
			var content = document.getElementById("messageContent").value
			api.sendMessage(this.props.user.email, this.state.partnerEmail, content)
		}
	}

	render(){
		return(
			<div className="container" style={{backgroundColor : 'white'}}>
						<Conversation user={this.props.user} partnerEmail={this.state.partnerEmail}/>
            <div className="compose">

              <input id = "messageContent" placeholder="Type a message" onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => this.sendMessage(e)}/>
                <div className="compose-dock">
              </div>
            </div>
          </div>
		)
	}
}

export default Messages
