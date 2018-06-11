import React from 'react';
import { Link } from 'react-router-dom'

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
function CreateCourseButton(props) {
	const isTeacher = props.isTeacher; 
	if(isTeacher){
		return (
			<div className="row">
              <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                <div className='row'>
                   <div className='col-6'>
     				
                    </div>
                   <div className='col-6'>
                   <Link to={`/createcourse/`} className='whitehover' style={{color: 'white !important'}}>
                     <div className='registrieren_botton' style={{marginTop: '-6px',fontSize: '16px'}}>
                      + Kurs anlegen
                   	 </div>
                   	 </Link>
                   </div>
                 </div>
              </div>
            </div>
			);
	}else{
		return(null); 
	}
}

function Element(props) {
	const course = props.course; 
	const mini = props.mini; 
	if(mini){
		return (
		<div className="w-100 course-name">
		<Link to={`/courses/${course.name}`}>{course.name}</Link>
		</div>
		); 
	}else{
		return (
		<div className="w-100 course-name">
		<Link to={`/courses/${course.name}`}>{course.name}</Link>
		<Link className="float-right" to={`/user/${course.teacher.email}`}>{course.teacher.lastname}</Link>
		</div>
		); 
	}
	
}

export class MyCourses extends React.Component {
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
					this.setState({list: courses.map((e)=>{return( <Element key={e._id} course={e} mini={this.props.mini}/>);})});
				});
		}
	}

	render(){
		return(
			<div className="box course-box col-12">
	          <div className="box-title">
	            Meine Kurse
	          </div>
				<div className="courses">
				{this.state.list}
				</div>
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
			<div className="box course-box col-12">
	          <div className="box-title">
	            All Kurse
	          </div>
				<div className="courses">
				{this.state.list}
				</div>
			</div>
			);
	}
}

export class AllCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		}; 
	}
	render(){
		return(
			<div>

			<CreateCourseButton isTeacher={this.props.user.isTeacher}/>

			<MyCourses myEmail={this.props.user.email}/>
				
			<OtherCourses/>
			</div>
			);
	}
}