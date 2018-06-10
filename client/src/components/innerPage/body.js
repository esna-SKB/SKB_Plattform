import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import {AllCourses, MyCourses} from './allCourses';
import Newsfeed from './newsfeed';
import TeacherInfo from './teacherInfo';
import Course from './course';
import Groups from './groups';
import Profile from './profile';
import SmallProfile from './smallProfile';
import { Messages } from './messages';


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
		        <ul className="nav justify-content-center col-12 centered">
		            <li className= "nav-item">
		            	<Link to={`/`}>Timeline</Link>
		            </li>

		            <li className="nav-item">

		               <Link to={`/courses`}>Kurse</Link>
		            </li>

		            <li className="nav-item">

		                <Link to={`/groups`}>Groupes</Link>
		            </li>
		          </ul>
		    </div>

			<div className="container-fluid">

		      <div className="cols background row">

		        <div className="col-md-3">

			        <SmallProfile user={this.props.user}/>

			        <MyCourses/>

		        </div>

		        <div className="col-md-3 order-md-last">
		        	<TeacherInfo/>      
		        </div>
		        <div className="col-md-6">
		              
                	<Switch>
                		<Route exact path='/' render={(props) => (
						  <Newsfeed user={this.props.user}/>
						)}/>
  						<Route path='/courses/:name' render={(props) => (
						  <Course user={this.props.user}/>
						)}/>
  						<Route exact path='/courses' render={(props) => (
						  <AllCourses user={this.props.user}/>
						)}/>
						<Route exact path='/groups/' render={(props) => (
						  <Groups user={this.props.user}/>
						)}/>
						<Route exact path='/profile/' render={(props) => (
						  <Profile user={this.props.user}/>
						)}/>
						<Route exact path='/messages/to/:user' render={(props) => (
						  <Profile user={this.props.user}/>
						)}/>
					</Switch>
		        </div>
		      </div>
		     </div>
		     </div>
		);
	}
}

export default Body; 