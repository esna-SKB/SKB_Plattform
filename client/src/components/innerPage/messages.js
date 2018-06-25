import React from 'react';
import Meow from'../../img/meow.png';
const api = require('../../api');

class ElementMessage extends React.Component{
	componentDidMount(){

	}
	render(){
		if(this.props.user == this.props.message.fromUser){
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
class ElementConversation extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			partner : [],
			conversationMessages : []
		}
	}
	componentDidMount(){
		api.getConversation(this.props.user, this.props.partner)
		.then( res => {
			this.setState({
				conversationMessages : res.map((e)=>{ return( <ElementMessage key={e._id} user={this.props.user} message={e}/>);})
			})
		})
	}
	render(){
		console.log(this.props.partner)
		var id = "tab_default_"+this.props.partner
		return (
			<div className="tab-pane" id={id} style={{height:'550px'}}>
				<div className="grid-message">
					{this.state.conversationMessages}
				</div>
			</div>
		);
	}
}

class Conversations extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			conversations : []
		}
	}
	componentDidMount(){
		api.getConversationPartners(this.props.user)
		.then( res =>{
				this.setState({
					conversations : res.map((e)=>{ return( <ElementConversation key={e} user={this.props.user} partner={e}/>);})
				})
		})
	}

	render(){
		return(
					<div>{this.state.conversations}</div>
		)
	}
}

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
		var href1 = "#tab_default_"+this.state.partner.email
		return (
			<li role="message" className="active" style={{'borderBottom': '1px solid #dee2e6'}}>
				<a href={href1} data-toggle="tab">
							<div className="avatar">
									<div className="avatar-image">
											<div className="status online"></div>
											<div className="contentMessenngerInfo" >
											<img src={Meow} alt="meow"/>
												<h3>{this.state.partner.firstname} {this.state.partner.lastname}</h3>
											</div>
									</div>
							</div>
				</a>
			</li>
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
		api.getConversationPartners(this.props.user)
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
export class Messages extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		};
	}

	sendMessage = () =>{
		var content = document.getElementById("messageContent").value
		api.sendMessage(this.props.user, this.props.partner, content)
	}
	render(){
		return(
			<div className="container" style={{backgroundColor : 'white'}}>
        <div className="row" style={{'border': '1px solid #dee2e6'}}>
          <div className="col-6" style={{'borderRight': '1px solid #dee2e6'}}>
            <div className="col-content">
              <div className="messages nav nav-tabs" >
								<ul className="nav nav-tabs" style={{listStyleType: 'none'}}>

                  <ConversationPartners user={this.props.user.email}/>
								</ul>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="col-content tab-content">
                	<Conversations user={this.props.user.email}/>
            </div>
        </div>
					</div>
          <div className="col-foot">
            <div className="compose">
              <input id = "messageContent" placeholder="Type a message"/>
                <div className="compose-dock">
                  <div className="dock"><img src=""/><img src=""/></div>
                </div>
              </div>
            </div>
          </div>
		);
	}
}
