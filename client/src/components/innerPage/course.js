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
	  courseId: this.props.course._id,
      courseName: props.course.name,
      articles: undefined,
      file: undefined
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
      api.createArticle(self.props.course._id,'Course',this.state.courseName, "", self.props.user.email, text, "", Date.now, "")
        .then(res => {
          self.handleArticlesUpdate(self.props.course._id)
          document.getElementById("textteilen").value = ""
        });
    } else {
      self.getBase64(self.state.file, function(base64file) {

        api.createArticle(self.props.course._id,'Course',this.state.courseName, "", self.props.user.email, text, self.state.file.type, Date.now, base64file)
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
          <div className='container' id="userposts">
            { articles.map(function(article) {
                return ( <Article key={ article._id } user={ this.props.user.email } article={ article } />);
              }, this) }
          </div>
        </div>
      )
    } else if (this.props.enrolled) {
      return (
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={ { padding: '20px' } }>
          <div className='container' id="userposts">
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
                return <li className='' style={ { textTransform: 'capitalize' } } key={ i }>
                         <Link to={ `/user/${member.email}` }>
                           { member.firstname }
                           { member.lastname }
                         </Link>
                         <Link to={ `/messages/${member.email}` }>
                           <img id="chat" className="icon float-right" src={ Chat } alt="Chat" />
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
      isTeacher: false,
	  minimumSize: 2,
	  maximumSize: 4,
	  prefDeadline: Date.now(),
	  members: undefined
    };
    this.bearbeiten = this.bearbeiten.bind(this);
	this.gruppenbilden = this.gruppenbilden.bind(this);
	this.onChange = this.onChange.bind(this);
	this.saveGroups = this.saveGroups.bind(this);
	console.log(this.state.prefDeadline);
	

  }

  
  componentDidMount() {
    var course_name = this.props.location.pathname.split("/")[2];
    course_name = course_name.replace("%20", " ");
    this.handleUpdate(course_name);

		
	api.getAllUsersOfCourse(course_name).then(res => {
		this.setState({
        members: res.reverse()
      })
		 
    });
	
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
  
  
	
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  saveGroups() {
		//groups of two and one three, if one person only incourse then one
		  api.getAllUsersOfCourse(this.state.course.name).then(res => {
			this.setState({
				members: res.reverse()
			})
		})
		.then(() => {
				console.log("these are the members");
				console.log(this.state.members)
				var members = this.state.members;
				if(members.length < 4)
					api.Group(this.state.course._id, "Gruppe: "+this.state.course.name, members, "Das ist die Gruppe für '"+this.state.course.name+ "'. Hier könnt ihr eure Abgaben besprechen")
				else{
					var i;
					for(i = 0; i < members.length-1; i= i+2){
						/*the last group will be three people if memebers has uneven length*/
						if(!(members.length % 2 == 0) && (members.length-2 == i)){
								api.Group(this.state.course._id, "Gruppe: "+this.state.course.name, [ members[i],members[i+1], members[i+2]],"Das ist die Gruppe für '"+this.state.course.name+ "'. Hier könnt ihr eure Abgaben besprechen");	
						}else{
								api.Group(this.state.course._id, "Gruppe: "+this.state.course.name, [ members[i], members[i+1]],"Das ist die Gruppe für '"+this.state.course.name+ "'. Hier könnt ihr eure Abgaben besprechen");	
						}
							
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
  
  
    joinCourse = () => {
    api.enrollUser(this.props.user.email, this.props.course._id, 'Course').then(res => {
      window.location.reload(false);
    });
  }
    gruppenbilden = () => {
		let groupmaker = this.refs.groupmaker

		if (groupmaker.style["display"] === 'none') {
		  groupmaker.style["display"] = 'block'
		  this.refs.gruppenbilden.innerHTML = 'schließen'
		  return;
		} else {
		  groupmaker.style["display"] = 'none'
		  this.refs.gruppenbilden.innerHTML = 'Gruppen bilden'

		}


  }


  render() {
	 
  
    //make sure API calls are finished when rendering (better solution????)
    if (!this.state.course) {
      return null;
    }
    // teacher view
    else {
	/*	 const course_name = this.state.course.name;
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
        <div>
          <div className="container-fluid" style={ { marginBottom: '20px', paddingRight: '54px', paddingLeft: '24px' } }>
            <div className="row">
              <div className="col" style={ { backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px' } }>
                <div className="row">
                  <div className="col" style={ { paddingRight: '0', paddingLeft: '20px' } }>
                    <h1 style={ { textTransform: 'capitalize' } }>{ this.state.course.name }</h1>
                  </div>
                  <div className="col-4">
                  </div>
                  <div className="col" style={ { paddingRight: '10px' } }>
                    <EnrollButton user={ this.props.user } course={ this.state.course } enrolled={ this.state.enrolled } />
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
              <div className="tab-content col-offset-6 centered" id="tab-content">
                <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
                  <div className="row">
                    <div className="d-block d-md-none order-md-last">
                      <div>
                        <TeacherInfo location={ this.props.location } user={ this.props.user } />
                        <InviteToCourse location={ this.props.location } user={ this.props.user } />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h3 style={ { borderBottom: '1px solid #efefef', paddingBottom: '15px' } }>Inhalt</h3>
                    </div>
					<div className="col-md-2">
					   <button ref="gruppenbilden" className='registrieren_botton' id="makegroups" style={ (this.state.course.teacher.email !== this.props.user.email) ? {
                                                                                                   display: 'none'
                                                                                                 } : {
                                                                                                   color: 'rgb(24, 86, 169)',
                                                                                                   marginTop: '-67px !important',
                                                                                                   fontSize: '13px',
                                                                                                   width: '139px',
                                                                                                   float: 'right',
                                                                                                   margin: '-12px 12px'
                                                                                                 } } onClick={ this.gruppenbilden }>
                        Gruppen bilden
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button ref="bearbeiten" className='registrieren_botton' id="edit" style={ (this.state.course.teacher.email !== this.props.user.email) ? {
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
				  
				  <div style={ { display: 'none' } } id="groupmaker" ref="groupmaker">
					<form>
						<div className="" id="minSize">
                          <label htmlFor="minimumSize">minimale Gruppengröße:</label>
                          <input type="text" className="form-control" name="minimumSize" aria-describedby="Help2" value={ this.state.minimumSize } onChange={ this.onChange }></input>
                          <small id="Help2" className="form-text text-muted">So groß soll eine Gruppe mindestens sein</small>
                        </div>
						<div className="" id="maxSize">
                          <label htmlFor="maximumSize">maximale Gruppengröße:</label>
                          <input type="text" className="form-control" name="maximumSize" aria-describedby="Help" value={ this.state.maximumSize } onChange={ this.onChange }></input>
                          <small id="Help" className="form-text text-muted">So groß soll eine Gruppe höhstens sein</small>
                        </div>
						<div className="form-group row newpart" id="teach">
                          <label htmlFor="prefdeadline">Deadline:</label>
						  <input type="datetime-local" className="form-control" name="prefdeadline" aria-describedby="Help3" value={ this.state.prefdeadline } min= {this.state.prefdeadline} onChange={ this.onChange }></input>
                          <small id="Help3" className="form-text text-muted">Bis dahin haben die Studenten_innen Zeit, ihre Präferenzen abzugeben</small>
                        </div>
						
						 <div ref="gruppenbildenspeichern" className='registrieren_botton' id="grspeichern" style={{
                                                                                                   color: 'rgb(24, 86, 169)',
                                                                                                   marginTop: '-67px !important',
                                                                                                   fontSize: '13px',
                                                                                                   width: '104px',
                                                                                                   float: 'right',
                                                                                                   margin: '-12px 0'
                                                                                                 } } onClick={ this.saveGroups }>
                        speichern
                      </div>
						
					</form>
				  </div>
				  
                  <p id="description" ref="description">
                    { this.state.course.description }
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
                <MemberTab enrolled={ this.state.enrolled } course={ this.state.course } isTeacher={ this.state.isTeacher } />
                <FeedTab enrolled={ this.state.enrolled } user={ this.props.user } course={ this.state.course } />
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}

export default Course;
