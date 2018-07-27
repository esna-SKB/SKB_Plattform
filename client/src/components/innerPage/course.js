import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import TeacherInfo from './teacherInfo';
import InviteToCourse from './inviteToCourse';
import Overview from './course/overview'
import Member from './course/member'
import Feed from './course/feed'
import Chat from '../../img/chat-icon.png';

import api from '../../api';
import pref_api from '../../utils/pref_api'; 

class EnrollButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: props.enrolled,
      user: props.user,
      course: props.course
    }
  }

  leaveCourse = () => {
    api.unenrollUser(this.props.user.email, this.props.course._id).then(res => {
      window.location.reload(false);
    });
  }

  joinCourse = () => {
    api.enrollUser(this.props.user.email, this.props.course._id, 'Course').then(res => {
      window.location.reload(false);
    });
  }

  render() {
    const {enrolled, user, course} = this.props;
    if (course.teacher.email !== user.email) {
      if (course.isFree === true) {
        return (
          <button id={ (enrolled) ? 'leavecourse' : 'joincourse' } className='btn' onClick={ (enrolled) ? this.leaveCourse : this.joinCourse } style={ { position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2' } }>
            { (enrolled) ? 'Abmelden' : 'mich einschreiben' }
          </button>
          );
      } else if (course.isFree === false && enrolled === true) {
        return (
          <button id={ 'leavecourse' } className='btn' onClick={ this.leaveCourse } style={ { position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2' } }>
            { 'Abmelden' }
          </button>
          );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

function CourseNav(props){
  if(props.enrolled || props.isTeacher){
    return(
      <div className="background-fluid" style={ { borderBottom: '1px solid #e8e9eb' } }>
        <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
          </li>
          <li className="nav-item">
            <a className="nav-link tab-title" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
          </li>
          <li className="nav-item">
            <a className="nav-link tab-title" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="memberstab" aria-selected="false">Teilnehmer</a>
          </li>
        </ul>
      </div>
      )
  }else{
    return(
      <div className="background-fluid" style={ { borderBottom: '1px solid #e8e9eb' } }>
        <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
          </li>
        </ul>
      </div>
      )
  }
}

class Course extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enrolled: false,
      course: undefined,
      file: null,
      isTeacher: false,
      content: '',
      prefDeadline: Date.now(),
      members: undefined
    };
  }


  componentDidMount() {
    var course_name = this.props.location.pathname.split("/")[2];
    course_name = course_name.replace("%20", " ");
    this.handleUpdate(course_name);

    this.updateMembersInCourse(course_name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var course_name = nextProps.location.pathname.split("/")[2];
      course_name = course_name.replace("%20", " ");
      this.handleUpdate(course_name);
      this.updateMembersInCourse(course_name)
    }
  }

  handleUpdate = (course_name) => {
    //get course
    api.getCourse(course_name)
      .then(course => {
        this.setState({
          course: course,
          isTeacher: (this.props.user.email === course.teacher.email)
        })
        if (course.content[0]) {
          for (let i = 0; i < course.content.length; i++) {
            document.getElementById('kursmaterial').innerHTML += course.content[i];
          }
        } else {
          document.getElementById('kursmaterial').innerHTML = '<p>kein Inhalt..</p>'
        }
      })
      // check if user is enrolled
      api.getAllCoursesOfUser(this.props.user.email)
        .then(res1 => {
        if (res1.some(item => item != null && item.name === course_name)) {
          this.setState({
            enrolled: true,
          })
        }
      })
      this.updateMembersInCourse()
  }

  updateMembersInCourse = (course_name) => {
    api.getAllUsersOfCourse(course_name)
    .then(res=>{
      this.setState({
        members: res
      })
    })
    
  }

  setTinderPrefObj = (max, deadline) => {
    const users = this.state.members.map(u=>u.email); 
    console.log(max, deadline)
    var mtx = []; 
    for (var i = 0; i < users.length; i++) {
      mtx[i]=new Array(users.length);
      for (var j = 0; j < mtx[i].length; j++) {
          mtx[i][j]=0; 
        }  
    }
    var prefObj = {
        course: this.state.course._id,
        matrix: mtx,
        users: users,
        groupSize: max,
        deadline: deadline
    }; 
    console.log(prefObj)
    pref_api.putPref(prefObj)
    .then(res => {
      console.log(res)
      this.handleUpdate(this.course.name)
    })
  }
  //make sure to update member tab when a member is added by teacher
  onInvite = () => {
    this.handleUpdate(this.state.course.name)
  }


  joinCourse = () => {
    api.enrollUser(this.props.user.email, this.props.course._id, 'Course').then(res => {
      window.location.reload(false);
    });
  }

  render() {
    const {enrolled, user, course, isTeacher} = this.state;
    console.log('members set', this.state.members)

    //make sure API calls are finished when rendering (better solution????)
    if (!this.state.course) {
      return null;
    } else {
      /*   const course_name = this.state.course.name;
        const members = this.state.members;

         if(members.length <2){
          api.Group(course_name,i/2, [members[0]], "Wir sind Gruppenummer:"+ i/2);
         }else{
          var i;
          for(i = 0; i < members.length-1; i= i+2){

            /*last group if uneven number of members
          if(!(members.length % 2 == 0) && (members.length-2 == i)){
              api.Group(course_name,i/2, [members[i],members[i+1], members[i+2]], "Wir sind Gruppenummer:"+ i/2);
          }else{
            api.Group(course_name,i/2, [members[i],members[i+1]], "Wir sind Gruppenummer:"+ i/2);
          }
         }
        }*/
      return (
        <div className="row">
          <div className="col-md-8" style={ { paddingRight: '0', paddingLeft: '0', paddingTop: '20px' } }>
            <div>
              <div className="container-fluid" style={ { marginBottom: '20px', paddingRight: '54px', paddingLeft: '24px' } }>
                <div className="row">
                  <div className="col" style={ { backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px' } }>
                    <div className="row">
                      <div className="col-7" style={ { paddingRight: '0', paddingLeft: '20px' } }>
                        <h1 style={ { textTransform: 'capitalize' } }>{ course.name }</h1>
                      </div>
                      <div className="col-4" style={ { paddingRight: '10px' } }>
                        <EnrollButton user={ this.props.user } course={ course } enrolled={ enrolled } />
                      </div>
                    </div>
                  </div>
                </div>
                <CourseNav enrolled={enrolled} isTeacher={this.state.isTeacher}/>
              </div>
              <div className="container-fluid row">
                <div className="col col-sm-12">
                  <div className="tab-content col-offset-6 centered">
                    <Overview enrolled={ enrolled } isTeacher={ isTeacher } location={ this.props.location } 
                      user={ this.props.user } handleUpdate={ this.handleUpdate } makegroups={this.makegroups}
                      course={ course } setTinderPrefObj={this.setTinderPrefObj} />
                    <Feed enrolled={ enrolled } user={ this.props.user } course={ course } isAdmin={ this.props.user.isAdmin } />
                    <Member members = {this.state.members} enrolled={ enrolled } course={ course } isTeacher={ isTeacher } location={ this.props.location } user={ this.props.user }
                      onInvite={ this.onInvite } updateMembersInCourse={this.updateMembersInCourse}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block col-md-4 order-md-last" style={ { paddingRight: '0', paddingLeft: '0' } }>
            <div style={ { paddingTop: '20px' } }>
              <TeacherInfo location={ this.props.location } user={ this.props.user } />
              <InviteToCourse location={ this.props.location } user={ this.props.user } onInvite={ this.onInvite } mini={ true } />
            </div>
          </div>
        </div>
      )
    }
  }
}



export default Course;
