import React from 'react';
import { Link } from 'react-router-dom'
import Meow from'../../img/lehrer.jpg';
import {withRouter} from 'react-router'

const api = require('../../api');


function uniqFilterAccordingToProp(prop) {
    if (prop)
        return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
    else
        return (ele, i, arr) => arr.indexOf(ele) === i
}

class MyTeachers extends React.Component{
	constructor(props){
	super(props);
	this.state = {
			teacher: "",
		};
	}

	componentDidMount(){
		if(this.props.myEmail!=null){
				//get teacher of the course
					var course = window.location.pathname.split("/")[2].replace("%20", " ");
					api.getCourse(course).then(
						(course) => this.setState({
							teacher: course.teacher
						})
					)
		}
	}
	render () {
   return (
       <div style={{marginTop : "2em"}}>
						 <div style={{clear: "both"}} className="contentTeacherinfo" key={this.state.teacher.email}>
						 <img  src={Meow} alt="meow" ></img>
						 <div> <strong><Link to={`/user/${this.state.teacher.email}`}>{this.state.teacher.firstname} {this.state.teacher.lastname}</Link></strong></div>
						 </div>
			</div>
   );
	}
}

class TeacherInfo extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		};
	}

	render(){
		return(
			<div className="row">
	            <div className="box col-12">
	              <div className="box-title">
	                Kursleiter kontaktieren
	              </div>
								<MyTeachers myEmail={this.props.user.email}/>
							</div>
	          </div>
			);
	}
}
export default TeacherInfo;
