import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import TeacherInfo from './teacherInfo';
import InviteToCourse from './inviteToCourse';
import Chat from '../../img/chat-icon.png';

import api from '../../api';
import pref_api from '../../utils/pref_api'; 
import dragula from 'dragula';


class FeedTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.course._id,
      courseName: props.course.name,
      articles: undefined,
      file: undefined,
      minimumSize: 2,
      maximumSize: 4,
      members: []
    }
  }

  componentDidMount() {
    this.handleArticlesUpdate(this.state.courseId)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.course.name !== nextProps.course.name) {
      this.handleArticlesUpdate(nextProps.course._id)
    }
  }


  handleArticlesUpdate = (courseid) => {
    api.getAllArticles(courseid)
      .then(res => {
        this.setState({
          articles: res.reverse()
        })
      });
  }

  postArticle = () => {



    var text = document.getElementById("textteilen").value;
    var self = this;
    if (!this.state.file) {
      api.createArticle(self.props.course._id, 'Course', self.state.courseName, "", self.props.user.email, text, "", Date.now, "")
        .then(res => {
          self.handleArticlesUpdate(self.props.course._id)
          document.getElementById("textteilen").value = ""
        });
    } else {
      self.getBase64(self.state.file, function(base64file) {
        var name = self.state.file.name;
        api.createArticle(self.props.course._id, 'Course', self.state.courseName, "", self.props.user.email, text, self.state.file.type, Date.now, base64file, self.state.file.name)

          .then(res => {
            self.handleArticlesUpdate(self.props.course._id)
            document.getElementById("textteilen").value = ""
            self.setState({
              file: undefined
            })
          });
      });
    }
  }

  getBase64(file, cb) {
    if (!file) {
      return cb("");
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      //console.log(reader.result);
      cb(reader.result)
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  fileUploader = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    const articles = this.state.articles;


    if (!articles) {
      return null;
    } else if (this.props.user.email === this.props.course.teacher.email) {
      return (
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={ { padding: '20px' } }>
          <div className="col-12" id="new_status" style={ { marginBottom: '20px' } }>
            <div className="container">
              <div className="row" style={ { borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px' } }>
                <div className="col-4" style={ { textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px' } }>
                  <span className="glyphicon glyphicon-pencil"></span> Text teilen
                </div>
              </div>
            </div>
            <div className="col-12" id="post_content">
              <div className="textarea_wrap">
                <textarea id='textteilen' className="col-xs-11" style={ { width: '100%' } } placeholder="write something..."></textarea>
                <input type="file" className="file" onChange={ this.fileUploader } />
              </div>
            </div>
            <div className="col-xs-12" id="post_footer">
              <div className="row">
                <div className="col-12">
                  <button id='teilen' className="btn btn-primary" onClick={ this.postArticle } style={ { float: 'right', marginBottom: '10px' } }>
                    Teilen
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            { articles.map(function(article) {
                return ( <Article key={ article._id } userEmail={ this.props.user.email } article={ article } isAdmin={ this.props.user.isAdmin } />);
              }, this) }
          </div>
        </div>
      )
    } else if (this.props.enrolled) {
      return (
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={ { padding: '20px' } }>
          <div>
            { articles.map(function(article) {
                return ( <Article key={ article._id } user={ this.props.user.email } userEmail={ this.props.user.email } article={ article } isAdmin={ this.props.user.isAdmin } />);
              }, this) }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

class MemberTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      members: undefined,
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
    this.handleUpdateMembers(nextProps.course.name)
    if (this.props.course.name !== nextProps.course.name) {
      this.handleUpdateMembers(nextProps.course.name)
    }
  }

  handleUpdateMembers = (course_name) => {
    if(!this.state.loadPref){
      console.log(this.props.course._id)
      pref_api.getPref(this.props.course._id)
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
      .then(() => {this.handleUpdateMembers(course_name)}); 
    } else {
      api.getAllUsersOfCourse(course_name)
      .then(res => {
        var membersRes = res.reverse();
        var memList = res.reverse().map((member, i) => {
          return (
            <ElementMember userChecked={(this.state.preference)? this.state.preference.matrix[this.state.userIndex][i]: undefined } key={ i } isAllowed={ (this.props.isTeacher || this.props.isAdmin) } member={ member } index={i} course={ this.props.course } 
            tinderIsOn={ this.state.tinderIsOn } handleUpdateMembers={ this.handleUpdateMembers }
            preference={this.state.preference}  handleCheckBox={ this.handleCheckBox } />
            );
        })
        if(this.state.members && this.state.members.length!==membersRes.length) this.props.updateMembersInCourse(membersRes); 
        
        this.setState({
          members: membersRes,
          membersList: memList
        })

      })
    }
  }

  handleCheckBox = (e) => {
    var preference = this.state.preference;
    const val = (e.target.checked) ? 1 : 0;
    var j = e.target.value; //preference.users.findIndex(user => (e.target.value === user));
    preference.matrix[this.state.userIndex][j] = val;
    this.setState({
      preference: preference,
      loadPref: false
    })
    var update = {course: preference.course, matrix : preference.matrix}; 
    console.log(update, 'matrix['+this.state.userIndex+']['+j+']', this.state.preference.matrix[this.state.userIndex][j])
    pref_api.putPref(update)
    .then(res => console.log(res))
  }

  render() {
    const membersList = this.state.membersList;
    console.log(membersList)

    var course = (this.props.course)
    if (membersList && (this.props.enrolled || this.props.isTeacher)) {
      return (
        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
          <div className="d-block d-md-none order-md-last justify-content-center">
            <div>
              <InviteToCourse location={ this.props.location } user={ this.props.user } onInvite={ this.handleUpdateMembers } />
            </div>
          </div>
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
      this.props.handleUpdateMembers(this.props.course.name);
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
    this.props.handleCheckBox(e); 
    this.setState({
      userChecked: (e.target.checked)? 1:0
    })
  }

  render(){
    if (this.props.tinderIsOn) {
      return (
        <input type="checkbox" name="member" value={ this.props.index } onChange={ this.handleCheck } checked={this.state.userChecked===1}/>
      )
    } else return 
  }
}

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

    api.getAllUsersOfCourse(course_name)
      .then(res => {
        var membersRes = res.reverse();
        this.setState({
          members: membersRes
          })
        })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var course_name = nextProps.location.pathname.split("/")[2];
      course_name = course_name.replace("%20", " ");
      this.handleUpdate(course_name);
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
      .then(() => api.getAllCoursesOfUser(this.props.user.email).then(res1 => {
        if (res1.some(item => item != null && item.name === course_name)) {
          this.setState({
            enrolled: true,
          })
        }
      }))
  }

  updateMembersInCourse = (members) => {
    this.setState({
      members: members
    })
    console.log('members set', members)
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
              </div>
              <div className="container-fluid row">
                <div className="col col-sm-12">
                  <div className="tab-content col-offset-6 centered">
                    <CourseDescription enrolled={ enrolled } isTeacher={ isTeacher } location={ this.props.location } 
                      user={ this.props.user } handleUpdate={ this.handleUpdate } makegroups={this.makegroups}
                      course={ course } setTinderPrefObj={this.setTinderPrefObj} />
                    <FeedTab enrolled={ enrolled } user={ this.props.user } course={ course } isAdmin={ this.props.user.isAdmin } />
                    <MemberTab enrolled={ enrolled } course={ course } isTeacher={ isTeacher } location={ this.props.location } user={ this.props.user }
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

class CourseDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayGroupmaker: false
    }
  }

  gruppenbilden = () => {
    console.log("gruppenbilden")
    this.setState((prevState)=>{
      return {displayGroupmaker: !prevState.displayGroupmaker}
    })
  }

  saveGroups = () => {
    //groups of two and one three, if one person only incourse then one
    const course_name = this.props.course.name; 
    api.getAllUsersOfCourse(course_name)
    .then(res => {
      this.setState({
        members: res.reverse()
      })
    })
      .then(() => {
        console.log("these are the members");
        console.log(this.state.members)
        var members = this.state.members;
        if (members.length < 4) {
          api.Group(this.state.course._id, "Gruppe: " + this.state.course.name, members, "Das ist die Gruppe für '" + this.state.course.name + "'. Hier könnt ihr eure Abgaben besprechen")
            .then((res) => {
              var j;
              for (j = 0; (j < members.length); j++) {
                /*response message saves the id of the group*/
                api.enrollUser(members[j].email, res.message, 'Group');
              }
            })
        } else {
          var i;
          for (i = 0; (i < (members.length - 2)); i = i + 2) {
            /*the last group will be three people if members has uneven length*/
            if( ((members.length % 2 == 1) && ((members.length - 3) === i)) ) {
              console.log("we are uneven number" + members.length + ", " + i)
              api.Group(this.state.course._id, "Gruppe: " + this.state.course.name, [members[i], members[i + 1], members[i + 2]], "Das ist die Gruppe für '" + this.state.course.name + "'. Hier könnt ihr eure Abgaben besprechen");

            } else {
              console.log("we are even number" + members.length + ", " + i)
              api.Group(this.state.course._id, "Gruppe: " + this.state.course.name, [members[i], members[i + 1]], "Das ist die Gruppe für '" + this.state.course.name + "'. Hier könnt ihr eure Abgaben besprechen");
            }
            this.refs.groupmaker.style["display"] = 'none';
            this.refs.gruppenbilden.innerHTML = 'fertig'


          }
        }
      })

  /* if(res.length <2){
     console.log("we are here one member only");
    api.Group(this.state.course.name,i/2, [res[i]], "Wir sind Gruppenummer:"+ i/2).then(res => {console.log(res.message)});
   }else{
    var i;
    for(i = 0; i < res.length-1; i= i+2){

      /*last group if uneven number of members
    if(!(res.length % 2 == 0) && (res.length-2 == i)){
        api.Group(this.state.course.name,i/2, [res[i],res[i+1], res[i+2]], "Wir sind Gruppenummer:"+ i/2);
    }else{
      api.Group(this.state.course.name,i/2, [res[i],res[i+1]], "Wir sind Gruppenummer:"+ i/2);
    }
   }
  }
  });*/
  }

  bearbeiten = () => {
    const handleUpdate = this.props.handleUpdate; 
    const db = localStorage;
    const _ = (el) => {
      return document.querySelector(el);
    };
    const getTpl = (element) => {
      return tpl[element];
    };

    const makeEditable = () => {
      let elements = document.querySelectorAll('.drop-element');
      let toArr = Array.prototype.slice.call(elements);
      Array.prototype.forEach.call(toArr, (obj, index) => {
        if (obj.querySelector('img')) {
          return false;
        } else {
          obj.addEventListener('click', (e) => {
            e.preventDefault();
            obj.children[0].setAttribute('contenteditable', '');
            obj.focus();
          });
          obj.children[0].addEventListener('blur', (e) => {
            e.preventDefault();
            obj.children[0].removeAttribute('contenteditable');
          });
        }
      });
    };
    const removeDivsToSave = () => {
      let elements = document.querySelectorAll('.drop-element');
      let toArr = Array.prototype.slice.call(elements);
      let html = '';
      Array.prototype.forEach.call(toArr, (obj, index) => {
        obj.children[0].removeAttribute('contenteditable');
        html += obj.innerHTML;
      });
      return html;
    };


    const tpl = {
      'header1': '<h1>I am header 1</h1>',
      'header2': '<h2>I am header 2</h2>',
      'header3': '<h3>I am header 3</h3>',
      'shortparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et</p>',
      'ullist': '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>',
      'ollist': '<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>',
    };

    const containers = [_('.box-left'), _('.box-right')];
    const drake = dragula(containers, {
      copy(el, source) {
        return source === _('.box-left');
      },
      accepts(el, target) {
        return target !== _('.box-left');
      }
    });

    drake.on('out', (el, container) => {
      if (container === _('.box-right')) {
        if (el.innerHTML[0] !== '<') {
          el.innerHTML = getTpl(el.getAttribute('data-tpl'));
        }
        el.className = 'drop-element';
        makeEditable();
        db.setItem('savedData', _('.box-right').innerHTML);
      }
      if (container === _('.box-left')) {
        el.innerHTML = el.getAttribute('data-title');
      }
    });


    let wrapper = this.refs.wrapper

    function elementChildren(element) {
      var childNodes = element.childNodes;
      var children = [];
      var i = childNodes.length;

      while (i--) {
        if (childNodes[i].nodeType === 1) {
          children.unshift(childNodes[i]);
        }
      }

      return children;
    }

    if (wrapper.style["display"] === 'none') {
      wrapper.style["display"] = 'block'
      this.refs.bearbeiten.innerHTML = 'save'

      // let description = this.refs.description
      // let description_div = document.createElement("div");
      // description_div.setAttribute('data-tpl', 'shortparagraph')
      // description_div.setAttribute('data-title', 'Short paragraph')
      // description_div.setAttribute('class', 'drop-element')
      // description_div.appendChild(description)
      let boxright = this.refs.boxright
      // boxright.appendChild(description_div)


      var children = this.refs.kursmaterial;
      children = elementChildren(children)
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.nodeName === 'H1') {
          let child_div = document.createElement("div");
          child_div.setAttribute('data-tpl', 'header1')
          child_div.setAttribute('data-title', 'Header 1')
          child_div.setAttribute('class', 'drop-element')
          child_div.appendChild(child)
          boxright.appendChild(child_div)
        }
        if (child.nodeName === 'H2') {
          let child_div = document.createElement("div");
          child_div.setAttribute('data-tpl', 'header2')
          child_div.setAttribute('data-title', 'Header 2')
          child_div.setAttribute('class', 'drop-element')
          child_div.appendChild(child)
          boxright.appendChild(child_div)
        }
        if (child.nodeName === 'H3') {
          let child_div = document.createElement("div");
          child_div.setAttribute('data-tpl', 'header3')
          child_div.setAttribute('data-title', 'Header 3')
          child_div.setAttribute('class', 'drop-element')
          child_div.appendChild(child)
          boxright.appendChild(child_div)
        }
        if (child.nodeName === 'P') {
          let child_div = document.createElement("div");
          child_div.setAttribute('data-tpl', 'shortparagraph')
          child_div.setAttribute('data-title', 'Short paragraph')
          child_div.setAttribute('class', 'drop-element')
          child_div.appendChild(child)
          boxright.appendChild(child_div)
        }
        console.log(child.nodeName)
      }

      return;
    } else {
      wrapper.style["display"] = 'none'
      this.refs.bearbeiten.innerHTML = 'bearbeiten'

      children = this.refs.boxright;
      children = elementChildren(children)

      var array = []
      for (i = 0; i < children.length; i++) {
        array.push(children[i].childNodes[0].outerHTML)
        this.refs.kursmaterial.appendChild(children[i].childNodes[0])
      }
      console.log(array)
      var course = this.props.course;
      course.content = array;
      api.updateCourse(course.name, course.name, this.props.user.email, course.description, array)
        .then(() => handleUpdate(course.name))

    }
  }

  renderGroupForm = () => {
    if(this.state.displayGroupmaker){
      return (
        <GroupForm setTinderPrefObj={this.props.setTinderPrefObj} saveGroups={ this.saveGroups }/>
      )
    }else return null
    
  }

  render() {
    const {enrolled, user, course, isTeacher} = this.props;
    const renderGroupForm = this.renderGroupForm(); 
    return (
      <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
        <div className="clearfix">
          <div className="d-block d-md-none order-md-last justify-content-center">
            <div>
              <TeacherInfo location={ this.props.location } user={ this.props.user } />
            </div>
          </div>
          <div className="">
            <div style={ { position: 'absolute', top: '2px', right: '20px' } } className="bilden_bearbeiten_button">
              <div className="float-right">
                <button ref="gruppenbilden" className='registrieren_botton' id="makegroups" style={ (course.teacher.email !== this.props.user.email) ? {
                                                                                                      display: 'none'
                                                                                                    } : {
                                                                                                      color: 'rgb(24, 86, 169)',
                                                                                                      fontSize: '13px',
                                                                                                      width: '139px',
                                                                                                    } } onClick={ this.gruppenbilden }>
                  Gruppen bilden
                </button>
              </div>
              <div className="float-right">
                <button ref="bearbeiten" className='registrieren_botton' id="edit" style={ (course.teacher.email !== this.props.user.email) ? {
                                                                                             display: 'none'
                                                                                           } : {
                                                                                             color: 'rgb(24, 86, 169)',
                                                                                             fontSize: '13px',
                                                                                             width: '104px',
                                                                                           } } onClick={ this.bearbeiten }>
                  bearbeiten 
                </button>
              </div>
            </div>
            <div style={ { borderBottom: '1px solid #efefef', paddingBottom: '15px', marginBottom: '20px' } }>Beschreibung</div>
          </div>
        </div>
        <div style={ { display: 'none' } } id="wrapper" ref="wrapper">
          <div className="wrapper">
            <div className="box-left">
              <div data-tpl="header1" data-title="Header 1">
                Header 1
              </div>
              <div data-tpl="header2" data-title="Header 2">
                Header 2
              </div>
              <div data-tpl="header3" data-title="Header 3">
                Header 3
              </div>
              <div data-tpl="shortparagraph" data-title="Short paragraph">
                paragraph
              </div>
              <div data-tpl="ullist" data-title="Ordened list">
                Unordened list
              </div>
              <div data-tpl="ollist" data-title="Unordened list">
                Ordened list
              </div>
            </div>
            <div id="boxright" ref="boxright" className="box-right"></div>
          </div>
        </div>
        { renderGroupForm }
        <p id="description" ref="description">
          { course.description }
        </p>
        <div style={ { borderBottom: '1px solid #efefef', paddingBottom: '15px', marginBottom: '20px' } }>Inhalt</div>
        <div id="kursmaterial" ref="kursmaterial">
        </div>
      </div>
    )
  }
}

class GroupForm extends Component {
  constructor(props){
    super(props); 
    this.state = {
      maximumSize: 2,
      deadline: '',
      selectOpt: 'tinder'
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (event) => {
    //this.props.saveGroups
    event.preventDefault(); 
    if(this.state.selectOpt==='tinder'){
      this.props.setTinderPrefObj(this.state.maximumSize, this.state.deadline)
    }else{
      this.props.saveGroups(this.state.maximumSize, this.state.deadline)
    }
    
  }

  render(){
    return (
    <div id="groupmaker" ref="groupmaker">
      <form className="box" ref="form" onSubmit={this.handleSubmit} >
          <label htmlFor="maximumSize">maximale Gruppengröße:
          <input type="number" className="form-control" name="maximumSize" value={this.state.maximumSize} aria-describedby="Help" min={2} onChange={ this.handleOnChange } required/>
          <small id="Help" className="form-text text-muted">So groß soll eine Gruppe höhstens sein</small>
        </label>
          <label htmlFor="prefdeadline">Deadline:</label>
          <input type="date" className="form-control" name="deadline" value={this.state.deadline} aria-describedby="Help3" onChange={ this.handleOnChange } required />
          <small id="Help3" className="form-text text-muted">Bis dahin haben die Studenten_innen Zeit, ihre Präferenzen abzugeben</small>
        <label> tinder-algo:
        <input type="radio" name="selectOpt" value="tinder" onChange={ this.handleOnChange } checked={this.state.selectOpt === 'tinder'}/>
         </label>
        <label> manuell:
        <input type="radio" name="selectOpt" value="manuell" onChange={ this.handleOnChange } checked={this.state.selectOpt === 'manuell'}/>
         </label>
      <input type="submit" value="Submit" className='registrieren_botton float-right' style={ { color: 'rgb(24, 86, 169)'} }  />
      </form>
    </div>
    )
  }
}

export default Course;
