import React from 'react';
import { Link, NavLink } from 'react-router-dom'

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
                   <div className='col'>
                   <Link to={`/createcourse`} className='whitehover' style={{color: 'white !important'}}>
                     <div className='registrieren_botton' style={{marginTop: '-6px',fontSize: '16px', float: 'none', margin: '0 auto', width: '160px'}}>
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
			<NavLink to={'/courses/'+course.name}>{course.name}</NavLink>
			</div>
		);

	}else{
		return (
		<div className="box">
			<div className="w-100 course-name">
			<Link to={`/courses/${course.name}`}>{course.name}</Link>
			<Link className="float-right" to={`/user/${course.teacher.email}`}>{course.teacher.lastname}</Link>
			</div>
		</div>
		);
	}

}

export class MyTeacherCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		list: []
		};
	}

	componentDidMount(){
    //get all courses that user is teaching
    if(this.props.user.isTeacher === true){
      getCourses('/course'
  			, (courses) =>{
          var coursesForFree = courses.filter((c) => c.teacher.email === this.props.user.email);
  				this.setState({list: coursesForFree.map((e)=>{ return( <Element key={e._id} course={e} mini={this.props.mini}/>);})});
  			});
    }
	}

	render(){
    if (this.props.user.isTeacher){
  		return(
  			<div className="box course-box col-12">
  	          <div className="box-title">
  	            Kurse, die ich unterrichte
  	          </div>
  				<div className="courses">
  				{this.state.list}
  				</div>
  			</div>
  			);
	   }
     else{
       return null;
     }
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
	            Meine Kurse <Link to={`/createcourse/`}>{/*<img src={Plus_img} style={{height: '20px', paddingLeft: '8px'}}/>*/}</Link>
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
    //teacher can see all courses in "Alle Kurse"
    if(this.props.user.isTeacher === true){
  		getCourses('/course'
  			, (courses) =>{
  				this.setState({list: courses.map((e)=>{ return( <Element key={e._id} course={e}/>);})});
  			});
    }
    //student should only see free courses in "Alle Kurse"
    else{
      getCourses('/course'
  			, (courses) =>{
          var coursesForFree = courses.filter((c) => c.isFree === true);
  				this.setState({list: coursesForFree.map((e)=>{ return( <Element key={e._id} course={e}/>);})});
  			});
    }
	}

	render(){

		return(
			<div className="box course-box col-12">
	          <div className="box-title">
	            Alle Kurse
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
	      		<MyTeacherCourses user={this.props.user}/>
				<MyCourses myEmail={this.props.user.email}/>
				<OtherCourses user={this.props.user}/>
			</div>
			);
	}
}
