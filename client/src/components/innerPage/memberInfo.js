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
		list: [],
		isMounted: false
		};
	}
    
    componentDidMount(){
		this.setState({ isMounted: true }, () => {
			if (this.state.isMounted) {
				this.setState({ isMounted: false });
				{
					var otherMembers = this.state.members.filter((m) => m.email !== this.state.user.email);
					this.setState({
						list: otherMembers.map((e) => {
						return( <Element member={e}/>);})
					})
				}
			}
		});   
    }

    render(){
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

class MemberInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			members: undefined,
			isMounted: false
			};
	}

    componentDidMount(){
		this.setState({ isMounted: true }, () => {
		if (this.state.isMounted) {
			this.setState({ isMounted: false });
			{
			  //get group
		var groupId = window.location.pathname.split("/")[2];
		api.getAllMembersOfGroup(groupId)
		.then(res => {
			this.setState({
				members : res
			});
		})        
			}
		  }
		});
		
		
    }

	render(){
   		return(
            <div className="row">
                <OtherMembers user={this.state.user} members={this.state.members}/>
	          </div>
			);
	}
}
export default MemberInfo;