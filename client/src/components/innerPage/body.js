import React from 'react';
import { Switch, Route, NavLink} from 'react-router-dom'

import {AllCourses, MyCourses, MyTeacherCourses} from './allCourses';
import Newsfeed from './newsfeed';
import Course from './course';
import CreateCourse from './createcourse';
import Groups from './groups';
import Profile from './profile';
import Profileedit from './profileedit';
import ChangePassword from './changePassword';
import Settings from './settings';
import SmallProfile from './smallProfile';
import InviteToCourse from './inviteToCourse';
import { Messages } from './messages';
import TeacherInfo from './teacherInfo';
import '../../css/course.css';


class Body extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		};
	}
	render(){

		//kann man hier nach wunsch anspaaen wie der active Link aussehen soll
		const activeObj = {
			    //fontWeight: 'bold',
			    color: "white",
			    backgroundColor: '#C0D9D9'
				}

		return(
			<div>
		{/*Navigation activeClassName='active'*/ }
			<div className="background-fluid background row">
		        <nav className="offset-md-3 col-md-6 nav nav-fill justify-content-center">

	            	<NavLink className="nav-item nav-link" exact={true} activeStyle={activeObj} to='/'>Newsfeed</NavLink>

	            	<NavLink className="nav-item nav-link" activeStyle={activeObj} to='/courses'>Kurse</NavLink>

	                <NavLink className="nav-item nav-link" activeStyle={activeObj} to='/groups'>Gruppen</NavLink>
		        </nav>
		    </div>


			<div className="container-fluid">
		      <div className="cols background row" style={{height:'100%'}}>

		    {/* Left Container*/}
		        <div className="col-md-3" style={{zIndex: '1'}}>

			        <SmallProfile user={this.props.user}/>
							<div  style={{paddingTop: '20px'}}></div>
							<MyTeacherCourses user={this.props.user} mini={true}/>
			        <MyCourses myEmail={this.props.user.email} mini={true}/>
		        </div>

		   {/* Right Container*/}
			 <div className="col-md-3 order-md-last">
							 <Route path='/courses/:name' render={(props) => (
								 <div>
									<TeacherInfo user={this.props.user}/>
									<InviteToCourse user={this.props.user}/>
								</div>
								)}/>
			 </div>

		    {/* MainWindow */}
		        <div className="col-md-6" style={{paddingRight : '0', paddingLeft: '0'}}>

            <Switch>
              <Route exact path='/' render={(props) => (
						  <Newsfeed user={this.props.user}/>
						)}/>
  						<Route exact path ='/courses/:name' render={(props) => (
						  <Course user={this.props.user}/>
						)}/>
  						<Route exact path='/courses' render={(props) => (
						  <AllCourses user={this.props.user}/>
						)}/>
						<Route exact path='/createcourse' render={(props) => (
						  <CreateCourse user={this.props.user}/>
						)}/>
						<Route exact path='/groups' render={(props) => (
						  <Groups user={this.props.user}/>
						)}/>
						<Route exact path='/profile' render={(props) => (
						  <Profile user={this.props.user}/>
						)}/>
						<Route exact path='/profileedit' render={(props) => (
						  <Profileedit user={this.props.user}/>
						)}/>
						<Route exact path='/settings' render={(props) => (
						  <Settings user={this.props.user}/>
						)}/>
						<Route exact path='/changePassword' render={(props) => (
						  <ChangePassword user={this.props.user}/>
						)}/>
						<Route exact path='/messages' render={(props) => (
						  <Messages user={this.props.user}/>
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
