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
  }

  componentDidMount(){
    this.loadPreference(this.props.course._id)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.course.name !== nextProps.course.name) {
      this.loadPreference(nextProps.course._id)
    }
  }

  getMemberElements = (members) => {
    if(members){
        return members.map((member, i) => {
          return (
            <ElementMember userChecked={(this.state.preference && this.state.userIndex>=0)? this.state.preference.matrix[this.state.userIndex][i]: undefined } key={ i } isAllowed={ (this.props.isTeacher || this.props.isAdmin) } member={ member } index={i} course={ this.props.course } 
            tinderIsOn={ (this.state.tinderIsOn && this.state.userIndex!=i && this.state.userIndex>=0)} handleUpdateMembers={ this.handleUpdateMembers }
            preference={this.state.preference}  handleCheckBox={ this.handleCheckBox } />
            );
        })
      }else {
        return null; 
      }
  }

  loadPreference = (courseId) => {
      console.log(courseId)
      return pref_api.getPref(courseId)
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
              loadPref: true,
              tinderIsOn: false,
              preference: undefined,
              userIndex: -1
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
    const { members } = this.props; 
    const membersList = this.getMemberElements(members);

    var course = (this.props.course)
    if (this.props.members && (this.props.enrolled || this.props.isTeacher)) {
      return (
        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
          <div className="d-block d-md-none order-md-last justify-content-center">
            <div>
              <InviteToCourse location={ this.props.location } user={ this.props.user } onInvite={ this.handleUpdateMembers } />
            </div>
          </div>
          <RunTinderButton preference={this.state.preference} courseId={course._id} isTeacher={this.props.isTeacher} 
          members={members} />
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
        <input type="checkbox" name="member" value={ this.props.member } onChange={ this.handleCheck } checked={this.props.userChecked===1}/>
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

  makeGroups = () =>{

  }

  render(){
    var groups; 
    const members = this.props.members

    if(this.state.groups){
      groups = this.state.groups.map((group, i)=>{
      var groupE = group.map((id,j)=>{
        var p = members.find((mem)=> mem._id == id)
        if(!p) p = { firstname : "not found", 
                    lastname :"not found"}
        return (
          <li key={j}>{p.firstname} { p.lastname}</li>
          )
      })
      return (
        <li key={i}>
        <ul>
        <h6>{'Group '+(i+1)}</h6>
          {groupE}
        </ul>
        </li>
        )
    });
    }
     
    if(this.props.preference && this.props.isTeacher/*&& this.props.tinderIsOn*/){
      return(
        <div>
        <button className='btn btn-dark' onClick={ this.handleRunTinder }>
                 Run Tinder
        </button>
          <div>
          <h6>The Result will be displayed here: </h6>
          <ul> {groups} </ul>
          </div>
          <button className='btn btn-success' onClick={this.makeGroups} >Submit</button>
        </div>
        )
    } else return (
      <div></div>
      )
  }
}

export default Member; 