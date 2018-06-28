import React from 'react';
import { Link } from 'react-router-dom';

const api = require('../../api');

function Element(props) {
	const member = props.member;
	if(true){return(<h6>a</h6>);
    }else{
    return (
        <div style={{marginTop : "2em"}}>
            <div style={{clear: "both"}} className="contentMemberinfo" key={this.props.member.email}>
                <img  src={this.props.member.picturedata} alt="profilepic" ></img>
                <div> <strong><Link to={'/user/'+this.props.member.email}>{this.props.member.firstname} {this.props.member.lastname}</Link></strong></div>
            </div>
        </div>
    );
            }
}


class OtherMembers extends React.Component {
    constructor(props){
	super(props);
	this.state = {
    user: this.props.user,
    members: this.props.members,
		};
	}
    
    componentDidMount(){
        var otherMembers = this.state.members.filter((m) => m.email !== this.state.user.email);
        this.setState({
            list: otherMembers.map((e) => {
                return( <Element member={e}/>);})
        })
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
    members: []
		};
	}

    componentDidMount(){
        //get members of the group
        var group = window.location.pathname.split("/")[2];
        console.log(api.getGroup(group).members);
        api.getGroup(group).then(
            (g)=>this.setState({
                members: g.members
            })
        )
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