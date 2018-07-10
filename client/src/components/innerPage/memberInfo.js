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
	}
    
    componentDidMount(){
			console.log("other members");
		console.log(this.props.members);
		var otherMembers = this.props.members.filter((m) => m.email !== this.props.user.email);
	
		this.setState({
			list: this.props.members.map((e) => {
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
			var mem = [];
			res.map((e) => {mem.push(e.user)})
			this.setState({
				members : mem
			});
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