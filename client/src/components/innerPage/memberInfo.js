import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/profilepicture.css';
const api = require('../../api');

function Element(props) {
	const member = props.member;
    return (
        <div>
            <div style={{clear: "both", marginBottom: '30px'}} className="contentTeacherinfo" key={member.email}>
               <div className="ProfileIcon"><img  src={member.picturedata} alt="profile picture" ></img></div>
               <div style={{marginTop : "2em"}}> <strong>
							 <Link to={'/user/'+member.email}>{member.firstname} {member.lastname}</Link>
							 </strong></div>
            </div>
        </div>
    );
}


class MemberInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: this.props.user,
			members: [],
			list: []
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
			console.log(this.state.members);

			var Members = this.state.members;
			console.log(Members)

			this.setState({
				list: Members.map((e) => {
				return( <Element key= {e._id} member={e}/>);})
			});
		})
    }

	render(){
		if(this.state.member === [] || !this.state.user) {return null;}
		else{
			const list = this.state.list;


			return(
				<div className="row" style={ { border: '1px solid rgb(232, 233, 235)'} }>
					<div className="box col-12">
						<div className="box-title">
							Gruppenteilnehmer
						</div>
						<div>
							{list}
						</div>
					</div>
				  </div>
			);
		}
	}
}
export default MemberInfo;
