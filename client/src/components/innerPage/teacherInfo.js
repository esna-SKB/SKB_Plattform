import React from 'react';
import { Link } from 'react-router-dom'
import Meow from'../../img/lehrer.jpg';
// import {withRouter} from 'react-router'

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
			teacher: ""
		};
	}

	componentDidMount(){
		this.setState({
      teacher: this.props.teacher
    })
	}
	render () {
   return (
       <div style={{marginTop : "2em"}}>
						 <div style={{clear: "both"}} className="contentTeacherinfo" key={this.props.teacher.email}>
						 <img  src={Meow} alt="meow" ></img>
						 <div> <strong><Link to={`/user/${this.props.teacher.email}`}>{this.props.teacher.firstname} {this.props.teacher.lastname}</Link></strong></div>
						 </div>
			</div>
   );
	}
}

class TeacherInfo extends React.Component {
	constructor(props){
	super(props);
	this.state = {
    user: this.props.user,
    teacher: ''
		};
	}

  componentDidMount(){
        //get teacher of the course
          var course = window.location.pathname.split("/")[2].replace("%20", " ");
          api.getCourse(course).then(
            (course) => this.setState({
              teacher: course.teacher
            })
          )
  }

	render(){
   if(this.state.user.email !== this.state.teacher.email){
		return(
			<div className="row">
	            <div className="box col-12">
	              <div className="box-title">
	                Kursleiter kontaktieren
	              </div>
					<MyTeachers myEmail={this.state.user.email} teacher={this.state.teacher}/>
				</div>
	          </div>
			);
    }
    else{
      return null;
    }
	}
}
export default TeacherInfo;
