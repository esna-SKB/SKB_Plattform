import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Chat from '../../../img/chat-icon.png';

import InviteToCourse from './../inviteToCourse';
import api from '../../../api';
import pref_api from '../../../utils/pref_api'; 


class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      members: props.members,
      membersList: undefined,
      tinderIsOn: false,
      preference: undefined,
      userIndex: -1, 
      loadPref: false
    }
    this.handleUpdateMembers = this.handleUpdateMembers.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount() {
    this.handleUpdateMembers(this.props.course.name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.members != nextProps.members) {
      this.handleUpdateMembers(nextProps.course.name)
    }
  }

  handleUpdateMembers = (course_name) => {
    this.loadPreference()
    .then(() => {
        var memList = this.props.members.reverse().map((member, i) => {
          return (
            <ElementMember userChecked={(this.state.preference && this.state.userIndex>=0)? this.state.preference.matrix[this.state.userIndex][i]: undefined } key={ i } isAllowed={ (this.props.isTeacher || this.props.isAdmin) } member={ member } index={i} course={ this.props.course } 
            tinderIsOn={ (this.state.tinderIsOn && this.state.userIndex!=i && this.state.userIndex>=0)} handleUpdateMembers={ this.handleUpdateMembers }
            preference={this.state.preference}  handleCheckBox={ this.handleCheckBox } />
            );
        })
        this.setState({
          membersList: memList
        })
      }) 
  }

  loadPreference = () => {
      console.log(this.props.course._id)
      return pref_api.getPref(this.props.course._id)
      .then(res => {
        if(res.success) {
          var now = Date.now(); 
          const pref = JSON.parse(res.obj); 
          console.log(pref)
          var deadline = new Date(pref.deadline.substr(0,10))
            this.setState({
              loadPref: true,
              tinderIsOn: (now < deadline.getTime()),
              preference: pref,
              userIndex: pref.users.findIndex(user => (this.props.user.email === user))
            })
        } else{
          console.log("no pref")
            this.setState({
              loadPref: true
            })
        }
      })
  }

  handleCheckBox = (event, indexOfMember) => {
    var preference = this.state.preference;
    const val = (event.target.checked) ? 1 : 0;
    preference.matrix[this.state.userIndex][indexOfMember] = val;
    this.setState({
      preference: preference,
      loadPref: false
    })
    var update = {course: preference.course, matrix : preference.matrix}; 
    console.log(update, 'matrix['+this.state.userIndex+']['+indexOfMember+']', this.state.preference.matrix[this.state.userIndex][indexOfMember])
    pref_api.putPref(update)
    .then(res => console.log(res))
  }

  render() {
    const membersList = this.state.membersList;

    var course = (this.props.course)
    if (membersList && (this.props.enrolled || this.props.isTeacher)) {
      return (
        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
          <div className="d-block d-md-none order-md-last justify-content-center">
            <div>
              <InviteToCourse location={ this.props.location } user={ this.props.user } onInvite={ this.handleUpdateMembers } />
            </div>
          </div>
          <RunTinderButton preference={this.state.preference} courseId={course._id} isTeacher={this.props.isTeacher} />
          <ul>
            { membersList }
          </ul>
        </div>
      )
    } else {
      return (
        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
          <p>members loading ...</p>
        </div>
      )
    }
  }
}
class ElementMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: props.member,
      course: props.course
    }
  }

  unenrollUser = () => {
    api.unenrollUser(this.props.member.email, this.props.course._id).then(() => {
      this.props.updateMembersInCourse(this.props.course.name);
    });
  }

  render() {
    const member = this.props.member;
    return (
      <li className='clearfix' style={ { textTransform: 'capitalize' } } key={ this.props.i }>
        <Link to={ `/user/${member.email}` }>
          { member.firstname + " " }
          { member.lastname }
        </Link>
        <PrefCheckBox index={this.props.index} userChecked={this.props.userChecked} member={ member } tinderIsOn={ this.props.tinderIsOn } handleCheckBox={ this.props.handleCheckBox } />
        <button className={ (this.props.isAllowed) ? "btn btn-danger btn-sm float-right" : "d-none" } onClick={ this.unenrollUser }> X </button>
        <Link className='float-right' to={ `/messages/${member.email}` }>
          <img id="chat" className="icon" src={ Chat } alt="Chat" />
        </Link>
      </li>
      );
  }
}

class PrefCheckBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      userChecked: props.userChecked
    }
  }
  
  handleCheck = (e) => {
    this.props.handleCheckBox(e, this.props.index); 
    this.setState({
      userChecked: (e.target.checked)? 1:0
    })
  }

  render(){
    if (this.props.tinderIsOn) {
      return (
        <input type="checkbox" name="member" value={ this.props.member } onChange={ this.handleCheck } checked={this.state.userChecked===1}/>
      )
    } else return null; 
  }
}

class RunTinderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups : undefined
    }
  }

  handleRunTinder = (e) => {
    console.log(this.props.courseId)
    pref_api.runTinder(this.props.courseId)
    .then(res=>{
      console.log(res)
      this.setState({
        groups : res 
      })
    })
  }
  render(){
    var groups; 
    if(this.state.groups){
      groups = this.state.groups.map((group, i)=>{
      var groupE = group.map((p,j)=>{
        return (
          <li key={j}>{p}</li>
          )
      })
      return (
        <li key={i}>
        <ul>
        <h6>{'Group '+i}</h6>
          {groupE}
        </ul>
        </li>
        )
    });
    }
     
    if(this.props.preference && this.props.isTeacher/*&& this.props.tinderIsOn*/){
      return(
        <div>
        <button  className='btn btn-dark' onClick={ this.handleRunTinder }>
                 Run Tinder
        </button>
          <div>
          <ul> {groups} </ul>
          </div>
        </div>
        )
    } else return (
      <div></div>
      )
  }
}

export default Member; 