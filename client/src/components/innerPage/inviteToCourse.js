import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom'

const api = require('../../api');

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    }
  }
  render() {
    return (
      <div className="contentMembersSearch">
        <div onClick = {()=>this.props.onSubmit(this.props.user.email)}  style={{ textDecoration: 'none'}} >
          <div style={ { clear: "both" } } className="contentMembersSearch">
            <img className="contentMembersSearch" src={ this.props.user.picturedata } alt="profilepicture" />
            <span className="contentMembersSearch course-name w-100">{ this.props.user.firstname } { this.props.user.lastname }</span>
          </div>
        </div>
      </div>
      );
  }
}
//This component handles the Suggestions for emails that the user gets
class Suggestions extends Component {

  render() {
    const options = this.props.results.map(r => (
      <Element key={ r.email } user={ r } onSubmit={this.props.onSubmit}/>
    ))
    return <div>
             { options }
           </div>
  }
}

//This component handles the Invitation that teachers can send out for courses that are not free
class InviteToCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      location: this.props.location,
      query: '',
      users: [],
      courseName: '',
      courseTeacher: '',
      isFree: '',
      errorMessage: '',
      allUsers: [],
      matches: []
    };
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var course_name = nextProps.location.pathname.split("/")[2];
      course_name = course_name.replace("%20", " ");
      this.handlesUpdate(course_name);
    }
  }

  componentDidMount() {
    var course_name = this.props.location.pathname.split("/")[2];
    course_name = course_name.replace("%20", " ");
    this.handlesUpdate(course_name);

    api.getAllUsers()
        .then(res1 => {
          api.getAllUsersOfCourse(course_name)
          .then(res2 => {
            res2 = res2.map(s => JSON.stringify(s))
            this.setState({
              allUsers: res1.filter(s=> !res2.includes(JSON.stringify(s)))
            })
          })
        })
  }

  handlesUpdate = (course_name) => {
    var course = api.getCourse(course_name);
    course.then(course => {
      this.setState({
        courseName: course_name,
        courseTeacher: course.teacher,
        isFree: course.isFree,
      })
    })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
      infoMessage: ""
    }, () => {
      if (this.state.query.length > 0) {
          this.getInfo()
      }
      else{
        this.setState({
          users : []
        })
      }
    })
  }

  getInfo = () => {
        const matches = this.state.allUsers.filter(s =>
          (s.email != this.props.user.email) && (s.firstname.startsWith(this.state.query) || s.lastname.startsWith(this.state.query) || s.email.startsWith(this.state.query)) && s.email !== this.props.user);
        this.setState({
          users: matches
        })
  }

  onSubmit = (email) => {
    var id = "inviteEmail"
    if(this.props.mini){
       id = "inviteEmailmini"
    }

    // // Post request to backend
    api.enrollUser(email, this.state.courseName)
    .then( res =>{
      this.props.onInvite(this.state.courseName)
      api.getAllUsers()
          .then(res1 => {
            api.getAllUsersOfCourse(this.state.courseName)
            .then(res2 => {
              res2 = res2.map(s => JSON.stringify(s))
              this.setState({
                allUsers: res1.filter(s=> !res2.includes(JSON.stringify(s)))
              })
            })
          })
    })

    api.invite(email, this.state.courseName)
      .then(json => {
        if (json.success === true) {
          this.setState({
            infoMessage: "Einladungs-Email versendet",
            users: []
          });
        }
      });
    document.getElementById(id).value="";
  }

  render() {
    var id = "inviteEmail"
    if(this.props.mini){
       id = "inviteEmailmini"
    }
    //check if user is responsible teacher for course and if course is not for free
    if (this.state.isFree === false && (this.state.user.email === this.state.courseTeacher.email)) {
      return (
        <div className="row">
          <div className="box col-12">
            <div className="box-title">
              Teilnehmer hinzufügen
            </div>
            <div style={ { marginTop: "1em" } }>
                <input id={id} className="form-control" placeholder="Suche nach Mitglied..." ref={ input => this.search = input } onChange={ this.handleInputChange }
                />
                  <Suggestions results={ this.state.users } onSubmit={this.onSubmit} />
                <div className="errorMessage" style={ { marginTop: "0.5em" } }>
                  { this.state.errorMessage }
                </div>
                <div className="infoMessage" style={ { marginTop: "0.5em" } }>
                  { this.state.infoMessage }
                </div>
            </div>
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default withRouter(InviteToCourse);
