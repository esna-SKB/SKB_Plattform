import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import TeacherInfo from './../teacherInfo';
import api from '../../../api';
import pref_api from '../../../utils/pref_api'; 
import dragula from 'dragula';

class Overview extends Component {
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
  hideGroupmaker = () => {
    this.setState({
      displayGroupmaker : false
    })
  }

  renderGroupForm = () => {
    if(this.state.displayGroupmaker){
      return (
        <GroupForm setTinderPrefObj={this.props.setTinderPrefObj} saveGroups={ this.saveGroups } hideGroupmaker={this.hideGroupmaker} />
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
      this.props.hideGroupmaker()
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

export default Overview;