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

function Element(props) {
	const course = props.course;  
	return (
		<div className="w-100 course-name">
		<Link to={`/courses/${course.name}`}>{course.name}</Link>
		<a className="float-right" href={"/user/"+course.teacher.email}>{course.teacher.lastname}</a>
		</div>
		); 
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
					this.setState({list: courses.map((e)=>{return( <Element key={e._id} course={e}/>);})});
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
		myEmail: this.props.myEmail
		}; 
	}
	render(){
		return(
			<div>
			<div className="row">
              <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                <div className='row'>
                   <div className='col-6'>
                      <h1 style={{fontSize: '30px'}}>Meine Kurse</h1>
                    </div>
                   <div className='col-6'>
                     <a href="/createcourse" className='whitehover' style={{color: 'white !important'}}>
                     <div className='registrieren_botton' style={{marginTop: '-6px',fontSize: '16px'}}>
                      + Kurs anlegen
                   	 </div>
                   	 </a>
                   </div>
                 </div>
              </div>
            </div>

			<div>
				<MyCourses myEmail={this.props.user.email}/>
				
				<OtherCourses/>
			</div>
			</div>
			);
	}
}
