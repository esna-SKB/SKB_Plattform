import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/profile.css';
/*add this css if you want the profile image on the left (circular)*/
import '../../css/profilepicture.css';
import Chat from '../../img/chat-icon.png';
const api = require('../../api');


function Bearbeiten(props) {
  const isMyProfile = props.isMyProfile;
  const email = props.email;
  if (isMyProfile) {
    return (
          <Link to={ `/user/${email}/edit` } style={{marginLeft: '10px', color: 'rgb(24, 86, 169)',
              fontSize: '13px', width: '104px', border: '2px solid rgb(24, 86, 169)', padding: '5px'}}>
            bearbeiten
          </Link>
      );
  } else {
    return null;
  }
}

function Element(props) {
  const course = props.course;
  return (
    <div className="w-100 course-name">
      <Link to={ '/courses/' + course.name }>
        { course.name }
      </Link>
    </div>
    );
}
class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    //get all courses that user is teaching
    if (this.props.user.isTeacher === true) {
      api.getAllCourses()
        .then(courses => {
          var freeCourses = courses.filter((c) => c.isFree === true);
          var myFreeCourses = freeCourses.filter((c) => c.teacher.email === this.props.user.email);
          this.setState({
            list: myFreeCourses.map((e) => {
              return ( <Element key={ e._id } course={ e } mini={ this.props.mini } />);
            })
          });
        });
    }
  }
  render() {
    if (this.props.user) {
      return (
        <div className="courses">
          { this.state.list }
        </div>
        );
    } else {
      return null;
    }
  }
}


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      shownprofile: undefined
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleIsTeacher = this.handleIsTeacher.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var email = nextProps.location.pathname.split("/")[2];
      this.handleUpdate(email, nextProps.user);
    }
  }
  componentDidMount() {
    var email = this.props.location.pathname.split("/")[2];
    this.handleUpdate(email, this.props.user)
    api.getUser(email)
      .then(res => {
        this.setState({
          shownprofile: res
        })
        this.handleIsTeacher(res.isTeacher)
      })
  }

  handleUpdate(email, user) {

    //check if user is different from shownuser
    //does not end with /profile so it is /user/:email
    api.getUser(email)
      .then(res => {
        this.setState({
          shownprofile: res
        })
        this.handleIsTeacher(res.isTeacher)
      })
  }
  handleIsTeacher(isTeacher) {
    if (isTeacher) {
      document.getElementById("role").innerHTML = "Lehrer_in";

      //ican/ilearn mit iteach und freie Kurse austauschen
      document.getElementById("trueLearn").style.display = 'none';
      document.getElementById("iLearn").style.display = 'none';
      document.getElementById("trueCan").style.display = 'none';
      document.getElementById("iCan").style.display = 'none';
      document.getElementById("trueTeach").style.display = 'block';
      document.getElementById("iTeach").style.display = 'block';
      document.getElementById("trueOffer").style.display = 'block';


    } else {
      document.getElementById("role").innerHTML = "Student_in";

      // iteach/freie Kurse mit ican und ilearn austauschen
      document.getElementById("trueLearn").style.display = 'block';
      document.getElementById("iLearn").style.display = 'block';
      document.getElementById("trueCan").style.display = 'block';
      document.getElementById("iCan").style.display = 'block';
      document.getElementById("trueTeach").style.display = 'none';
      document.getElementById("iTeach").style.display = 'none';
      document.getElementById("trueOffer").style.display = 'none';
    }
    //dummy values
    var countCourses = 4;
    var countGroups = 3;
    document.getElementById("countCourses2").innerHTML = countCourses;
    document.getElementById("countGroups2").innerHTML = countGroups;
  }


  render() {
    //grab state
    const {user, shownprofile, } = this.state;
    if (!shownprofile) {
      return false;
    } else {
      return (
        <div>
          <div className="container-fluid">
            <div className="background row">
              <div className="col col-sm-12">
                <div className="row box ">
                  <div className="">
                    <div className="col">
                      <div className="row center-block ">
                        <div className="col profilepicbig fill col-md-4" style={{paddingBottom: '20px'}}>
                          <img id="YourPicture" src={ shownprofile.picturedata }></img>
                        </div>
                        <div className="col-md-8">
                          <h4 className="title" style={{float:'left'}}><strong id="YourName02">{ shownprofile.firstname + " " + shownprofile.lastname }</strong></h4>
                          <Link to={ `/messages/${shownprofile.email}` }><img id="chat" className="icon" style={ { fontSize: '10px', paddingRight: '0', float:'left' } } src={ Chat } alt="Chat" /></Link>

                          <Bearbeiten email={ user.email } isMyProfile={ user.email === shownprofile.email } />


                          <div className="row" style={{clear: 'both', paddingTop:'30px'}}>
                            <div className="col-sm-12 col-lg-6  text-center d-none d-md-block">
                              <strong id="countCourses2"></strong>
                              <br /><small className="text-muted ">Kurse</small>
                            </div>
                            <div className="col-sm-12  col-lg-6  text-center d-none d-md-block">
                              <strong id="countGroups2"></strong>
                              <br /><small className="textstrong text-muted ">Gruppen</small>
                            </div>
                          </div>
                        </div>

                        <div className="makespace col">
                          <div className="row  text-muted">
                            <p className="lineup" id="role"></p>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row-12 text-muted">
                      <div className="col-12 description" id="description">
                        { shownprofile.description }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row box newpart">
                  <div className="col-sm-12">
                    <div className="col">
                      <div className="row  text-muted">
                        <div className="col-4" id="trueCan">ich kann:</div>
                        <div className="col-8" id="iCan">
                          { shownprofile.iCan }
                        </div>
                        <div className="col-4" id="trueTeach" style={{color: 'black'}}><strong>ich bringe bei:</strong></div>
                        <div className="col-8" id="iTeach">
                          { shownprofile.iTeach }
                        </div>
                      </div>
                      <div className="row  lineup ">
                        <div className="col-4 text-muted " id="trueLearn">ich lerne:</div>
                        <div className="col-8 text-muted" id="iLearn">
                          { shownprofile.iLearn }
                        </div>
                        <div className="col-12" id="trueOffer"><strong>mein kostenloses Angebot:</strong>
                          <Courses user={ this.state.shownprofile } />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row box newpart">
                  <div className=" col-sm-12">
                    <div className="col">
                      <div className="row  text-muted">
                        <div className="col-4" style={{color: 'black'}}><strong>E-Mail:</strong></div>
                        <a className="col-8" id="email" href={ "mailto:" + shownprofile.email }>
                          { shownprofile.email }
                        </a>
                      </div>
                      <div className="row text-muted lineup ">
                        <div className="col-4" style={{color: 'black'}}><strong>Website:</strong></div>
                        <a className="col-8" id="website" href={ "http://" + shownprofile.website }>
                          { shownprofile.website }
                        </a>
                      </div>
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
}

export default Profile;
