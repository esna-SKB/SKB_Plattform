import React from 'react';
import ReactDOM from 'react-dom';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}


function getCourses(route, cb){
		return fetch(route)
			.then(status)
		    .then((response) => response.json())
		    .then((courses)=>{
		    	cb(courses)
		    })
		    .catch((error) => {
		      console.error(error);
	    });
      }

function Element(props) {
	const course = props.course;  
	return (
		<div className="w-100 course-name">
		<a className="btn " href={"/course/"+course.name}>{course.name}</a>
		<a className="float-right" href={"/user/"+course.teacher.email}>{course.teacher.lastname}</a>
		</div>
		); 
}

class MyCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		list: []
		}; 
	}
	componentDidMount(){
		let i = 0; 
		if(this.props.myEmail!=null){

			getCourses('/user/'+this.props.myEmail+'/course'
				, (courses) =>{
					this.setState({list: courses.map((e)=>{ return( <Element key={e._id} course={e}/>);})});
				});
		}
	}

	render(){
		return(
			<div className="courses">
			{this.state.list}
			</div>
			); 
	}
}
class OtherCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		list: [] 
		}; 
	}

	componentDidMount(){
		let i = 0; 
		getCourses('/course'
			, (courses) =>{
				this.setState({list: courses.map((e)=>{ return( <Element key={e._id} course={e}/>);})});
			});
		
	}

	render(){

		return(
			<div className="courses">
			{this.state.list}
			</div>
			);
	}
}

class AllCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: this.props.myEmail
		}; 
	}
	render(){
		return(
			<div>
				<h3> Meine Kurse </h3>
				<MyCourses myEmail={this.props.myEmail}/>
				<h3> Alle Kurse </h3>
				<OtherCourses/>
			</div>

			);
	}
}

export default AllCourses; 