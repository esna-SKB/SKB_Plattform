import React, { Component } from 'react';

const api = require('../../api');

//This component handles the Suggestions for emails that the user gets
class Suggestions extends Component {

  render() {
    const options = this.props.results.map(r => (
      <option key={ r.email } value={ r.email }>{r.firstname} {r.lastname}</option>
    ))
    return <ul>
             { options }
           </ul>
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
      allUsers: []
    };
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
        .then(res => {
          this.setState({
            allUsers: res
          })
        })
  }

  handlesUpdate = (course_name) => {
    var course = api.getCourse(course_name);
    course.then(course => {
      this.setState({
        courseName: course_name,
        courseTeacher: course.teacher,
        isFree: course.isFree
      })
    })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
      errorMessage: "",
      infoMessage: ""
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.getInfo()
        }
      })
  }

  getInfo = () => {
        const matches = this.state.allUsers.filter(s =>
          s.firstname.startsWith(this.state.query) || s.lastname.startsWith(this.state.query) || s.email.startsWith(this.state.query));
        this.setState({
          users: matches
        })
  }

  onSubmit = () => {
    let requestEmail = document.getElementById("inviteEmail");
    //check if Email Adress is a valid Email
    if (requestEmail.value.match(/^([\w\d.-]+)@([\w\d-]+\.)+([\w]{2,})$/i) == null) {
      this.setState({
        errorMessage: "Bitte gib eine gültige E-Mail Adresse an."
      });
      return;
    }
    // // Post request to backend
    //api.enrollUser(requestEmail.value, this.state.courseName)
    api.invite(requestEmail.value, this.state.courseName)
      .then(json => {
        if (json.success === true) {
          this.setState({
            requestSent: true,
            errorMessage: '',
            infoMessage: "Einladungs-Email versendet"
          });
        }
      });
    requestEmail.value = "";
  }

  render() {
    //check if user is responsible teacher for course and if course is not for free
    if (this.state.isFree === false && (this.state.user.email === this.state.courseTeacher.email)) {
      return (
        <div className="row">
          <div className="box col-12">
            <div className="box-title">
              Teilnehmer hinzufügen
            </div>
            <div style={ { marginTop: "1em" } }>
              <form>
                <input id='inviteEmail' className="form-control" placeholder="Suche nach E-Mail-Adresse..." ref={ input => this.search = input } onChange={ this.handleInputChange } list="json-datalist"
                />
                <datalist id="json-datalist">
                  <Suggestions results={ this.state.users } />
                </datalist>
                <div style={ { textAlign: "center" } }>
                  <a id='inviteButton' className='btn' onClick={ this.onSubmit }>einladen</a>
                </div>
                <div className="errorMessage" style={ { marginTop: "0.5em" } }>
                  { this.state.errorMessage }
                </div>
                <div className="infoMessage" style={ { marginTop: "0.5em" } }>
                  { this.state.infoMessage }
                </div>
              </form>
            </div>
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default InviteToCourse;
