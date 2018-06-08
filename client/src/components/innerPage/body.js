import React from 'react';
import { Switch, Route } from 'react-router-dom'

import SmallProfile from './smallProfile';
import {AllCourses, MyCourses} from './allCourses';
import Newsfeed from './newsfeed';
import TeacherInfo from './teacherInfo';
import Course from './course';
import Groups from './groups';


class Body extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		}; 
	}



	render(){
		return(
			<div>
			<div className="background-fluid background">
		        <ul className="nav nav-tabs justify-content-center col-12 centered" id="mytabs" role="tablist">
		            <li className= "nav-item">
		                <a className="tab-title nav-link active" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="true">Timeline</a>
		            </li>

		            <li className="nav-item">

		                <a className="tab-title nav-link" id="kurse-tab" data-toggle="tab" href="#kurse" role="tab" aria-controls="kurse" aria-selected="false">Kurse</a>
		            </li>

		            <li className="nav-item">

		                <a className="tab-title nav-link" id="gruppen-tab" data-toggle="tab" href="#gruppen" role="tab" aria-controls="gruppen" aria-selected="false">Gruppen</a>
		            </li>
		          </ul>
		    </div>

			<div className="container-fluid">

		      <div className="cols background row">

		        <div className="col-md-3">

			        <SmallProfile/>

			        <MyCourses/>

		        </div>

		        <div className="col-md-3 order-md-last">

		        	<TeacherInfo/>
		          
		        </div>


		        <div className="col-md-6">
		          <div className="tab-content" id="tab-content">
		              <div className="tab-pane fade show active" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">

		              <Newsfeed/>
		              
		              </div>

		              <div className="tab-pane fade" id="kurse" role="tabpanel" aria-labelledby="kurse-tab">
		                <div className="box">

		                	<Switch>
	      						<Route path='/courses/:name' render={(props) => (
								  <Course user={this.props.user}/>
								)}/>
	      						<Route exact path='/courses' render={(props) => (
								  <AllCourses user={this.props.user}/>
								)}/>
							</Switch>
		               
		                </div>
		              </div>

		              <div className="tab-pane fade" id="gruppen" role="tabpanel" aria-labelledby="gruppen-tab">

		                <div className="box">

		                  <Groups/>

		                </div>
		              </div>
		          </div>
		        </div>
		      </div>
		     </div>
		     </div>
		);
	}
}

export default Body; 