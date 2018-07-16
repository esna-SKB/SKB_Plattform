import React from 'react';
import { Link } from 'react-router-dom'
import Chat from '../../img/chat-icon.png';
// import {withRouter} from 'react-router'
import '../../css/profilepicture.css';

const api = require('../../api');


function uniqFilterAccordingToProp(prop) {
  if (prop)
    return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
  else
    return (ele, i, arr) => arr.indexOf(ele) === i
}

class MyTeachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: ""
    };
  }

  componentDidMount() {
    this.setState({
      teacher: this.props.teacher
    })
  }
  render() {
    return (
      <div style={ { marginTop: "2em" } }>
        <div style={ { clear: "both" } } className="contentTeacherinfo" key={ this.props.teacher.email }>
         <div className="ProfileIcon"> <img src={ this.props.teacher.picturedata } alt="profilepic"></img></div>
          <div>
            <strong>
            			<Link to={ `/user/${this.props.teacher.email}` }>{ this.props.teacher.firstname } { this.props.teacher.lastname }</Link>
            		</strong>
            <Link className='float-right' to={ `/messages/${this.props.teacher.email}` }><img id="chat" className="icon" style={ { fontSize: '10px' } } src={ Chat } alt="Chat" /></Link>
          </div>
        </div>
      </div>
      );
  }
}

class TeacherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      teacher: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var course_name = nextProps.location.pathname.split("/")[2];
      course_name = course_name.replace("%20", " ");
      this.handleUpdate(course_name);
    }
  }

  componentDidMount() {
    //get teacher of the course
    var course_name = this.props.location.pathname.split("/")[2].replace("%20", " ");
    course_name = course_name.replace("%20", " ");
    this.handleUpdate(course_name);
  }

  handleUpdate = (courseName) => {
    api.getCourse(courseName)
      .then((course) => this.setState({
        teacher: course.teacher
      })
    )
  }

  render() {
    const {
      user,
      teacher
    } = this.state;

    if (teacher && user.email !== teacher.email) { //if teacher is loaded and user is different from teacher, show
      return (
        <div className="row">
          <div className="box col-12">
            <div className="box-title">
              Kursleiter kontaktieren
            </div>
            <MyTeachers myEmail={ this.state.user.email } teacher={ this.state.teacher } />
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}
export default TeacherInfo;
