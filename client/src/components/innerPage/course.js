import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import TeacherInfo from './teacherInfo';
import InviteToCourse from './inviteToCourse';
import Chat from '../../img/chat-icon.png';
// import $ from 'jquery';

//import axios from 'axios';

import api from '../../api';
// import builder from '../../utils/builder';
import dragula from 'dragula';

class FeedTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: props.course.name,
      articles: undefined,
      file: undefined
    }
  }

  componentDidMount() {
    this.handleArticlesUpdate(this.props.course.name)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.course.name !== nextProps.course.name) {
      this.handleArticlesUpdate(nextProps.course.name)
    }
  }

  handleArticlesUpdate = (course_name) => {
    api.getAllArticlesOfCourse(course_name)
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
      api.createArticle(self.props.course.name, "", self.props.user.email, text, "", Date.now, "")
        .then(res => {
          self.handleArticlesUpdate(self.props.course.name)
          document.getElementById("textteilen").value = ""
        });
    } else {
      self.getBase64(self.state.file, function(base64file) {

        api.createArticle(self.props.course.name, "", self.props.user.email, text, self.state.file.type, Date.now, base64file)
          .then(res => {
            self.handleArticlesUpdate(self.props.course.name)
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
                return ( <Article key={ article._id } userEmail={ this.props.user.email } article={ article } />);
              }, this) }
          </div>
        </div>
      )
    } else if (this.props.enrolled) {
      return (
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={ { padding: '20px' } }>
          <div>
            { articles.map(function(article) {
                return ( <Article key={ article._id } user={ this.props.user.email } article={ article } />);
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
      members: undefined
    }
  }

  componentDidMount() {
    this.handleUpdateMembers(this.props.course.name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.name !== nextProps.course.name) {
      this.handleUpdateMembers(nextProps.course.name)
    }
  }

  handleUpdateMembers = (course_name) => {
    api.getAllUsersOfCourse(course_name).then(res => {
      this.setState({
        members: res.reverse()
      })
    })
  }

  render() {
    const members = this.state.members;
    if (members && (this.props.enrolled || this.props.isTeacher)) {
      return (
        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
          <ul>
            { members.map(function(member, i) {
                return <li className='clearfix' style={ { textTransform: 'capitalize' } } key={ i }>
                         <Link to={ `/user/${member.email}` }>
                           { member.firstname }
                           { member.lastname }
                         </Link>
                         <Link className='float-right' to={ `/messages/${member.email}` }>
                           <img id="chat" className="icon" src={ Chat } alt="Chat" />
                         </Link>
                       </li>
              }) }
          </ul>
        </div>
      )
    } else {
      return null;
    }
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
    api.unenrollUser(this.props.user.email, this.props.course.name).then(res => {
      window.location.reload(false);
    });
  }

  joinCourse = () => {
    api.enrollUser(this.props.user.email, this.props.course.name).then(res => {
      window.location.reload(false);
    });
  }

  render() {
    const {enrolled, user, course} = this.props;

    if (course.teacher.email !== user.email) {
      return (
        <button id={ (enrolled) ? 'leavecourse' : 'joincourse' } className='btn' onClick={ (enrolled) ? this.leaveCourse : this.joinCourse } style={ { position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2' } }>
          { (enrolled) ? 'Abmelden' : 'mich einschreiben' }
        </button>
        );
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
      isTeacher: false
    };
    this.bearbeiten = this.bearbeiten.bind(this);
  }

  componentDidMount() {
    var course_name = this.props.location.pathname.split("/")[2];
    course_name = course_name.replace("%20", " ");
    this.handleUpdate(course_name);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      var course_name = nextProps.location.pathname.split("/")[2];
      course_name = course_name.replace("%20", " ");
      this.handleUpdate(course_name);
    }
  }

  handleUpdate(course_name) {
    //get course
    api.getCourse(course_name)
      .then(course => {
        this.setState({
          course: course,
          isTeacher: this.props.user.email === course.teacher.email
        })
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

  bearbeiten = () => {
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
      'image': '<img src="">'
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
        console.log(child)
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

    }


  }


  render() {
    const {
      enrolled,
      user,
      course,
      isTeacher
    } = this.state; 
    //make sure API calls are finished when rendering (better solution????)
    if (!this.state.course) {
      return null;
    }
    // teacher view
    else {
      return (
        <div>
          <div className="container-fluid" style={ { marginBottom: '20px', paddingRight: '54px', paddingLeft: '24px' } }>
            <div className="row">
              <div className="col" style={ { backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px' } }>
                <div className="row">
                  <div className="col" style={ { paddingRight: '0', paddingLeft: '20px' } }>
                    <h1 style={ { textTransform: 'capitalize' } }>{ course.name }</h1>
                  </div>
                  <div className="col-4">
                  </div>
                  <div className="col" style={ { paddingRight: '10px' } }>
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
          <div className="background container-fluid row">
            <div className="col col-sm-12">
              <div className="tab-content col-offset-6 centered">
                <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
                  <div>
                    <div className="d-block d-md-none order-md-last justify-content-center">
                      <div>
                        <TeacherInfo location={ this.props.location } user={ this.props.user } />
                        <InviteToCourse location={ this.props.location } user={ this.props.user } />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h3 style={ { borderBottom: '1px solid #efefef', paddingBottom: '15px' } }>Inhalt</h3>
                    </div>
                    <div className="">
                      <button ref="bearbeiten" className='registrieren_botton' id="edit" style={ (course.teacher.email !== this.props.user.email) ? {
                                                                                                   display: 'none'
                                                                                                 } : {
                                                                                                   color: 'rgb(24, 86, 169)',
                                                                                                   marginTop: '-67px !important',
                                                                                                   fontSize: '13px',
                                                                                                   width: '104px',
                                                                                                   float: 'right',
                                                                                                   margin: '-12px 0'
                                                                                                 } } onClick={ this.bearbeiten }>
                        bearbeiten
                      </button>
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
                          Ordened list
                        </div>
                        <div data-tpl="ollist" data-title="Unordened list">
                          Unordened list
                        </div>
                        <div data-tpl="heade12" data-title="Unordened list">
                          Datei
                        </div>
                        <div data-tpl="header12" data-title="Unordened list">
                          Picture
                        </div>
                      </div>
                      <div id="boxright" ref="boxright" className="box-right"></div>
                    </div>
                  </div>
                  <p id="description" ref="description">
                    { course.description }
                  </p>
                  <div id="kursmaterial" ref="kursmaterial">
                    <h3>Kursmaterial</h3>
                    <h3>16. April - 22. April</h3>
                    <p>
                      Folie 01
                    </p>
                    <p>
                      Folie 02
                    </p>
                  </div>
                </div>
                <MemberTab enrolled={ enrolled } course={ course } isTeacher={ isTeacher } />
                <FeedTab enrolled={ enrolled } user={ this.props.user } course={ course } />
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}

export default Course;
