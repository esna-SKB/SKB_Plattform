import React from 'react';
import { Link } from 'react-router-dom';

const api = require('../../api');

function Element(props) {
	const member = props.member;
    return (
        <div style={{marginTop : "2em"}}>
            <div style={{clear: "both"}} className="contentMemberinfo" key={this.props.member.email}>
                <img  src={this.props.member.picturedata} alt="profilepic" ></img>
                <div> <strong><Link to={'/user/'+this.props.member.email}>{this.props.member.firstname} {this.props.member.lastname}</Link></strong></div>
            </div>
        </div>
    );
}


class OtherMembers extends React.Component {
    constructor(props){
	super(props);
	this.state = {
		user: this.props.user,
		members: this.props.members,
		list: []
		};
		console.log("we sent");
		console.log(this.state.members);
		console.log("and this is props");
		console.log(this.props.members);
	}
    
    componentDidMount(){
		
		var otherMembers = this.state.members.filter((m) => m.email !== this.state.user.email);
		console.log("other members");
		console.log(this.state.members);
		this.setState({
			list: this.state.members.map((e) => {
			return( <Element member={e}/>);})
		});
	}
			
    render(){
		if(!this.props.members){
			return null;
		}else{
			return(
				<div className="box col-12">
					<div className="box-title">
						Gruppenteilnehmer
					</div>
					<div>
						{this.state.list}
					</div>
				</div>
			);
		}
    }
}

class MemberInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			members: []
		};
	}

    componentDidMount(){
		//get group
		var groupId = window.location.pathname.split("/")[2];
		api.getAllMembersOfGroup(groupId)
		.then(res => {
			this.setState({
				members : res
			});
			console.log("the members");
			console.log(this.state.members);
		})        
    }

	render(){
		if(this.state.member === [] || !this.state.user) {return null;}
		else{
			const members = this.state.members;
			console.log("das ist noch hier");
			console.log(members);
			
			return(
				<div className="row">
					<OtherMembers user={this.state.user} members={members}/>
				  </div>
			);
		}
	}
}
export default MemberInfo;