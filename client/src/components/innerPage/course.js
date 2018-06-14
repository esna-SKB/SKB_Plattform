import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';


import Meow from'../../img/meow.png';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../../utils/userSessionHelper';
import api from '../../api';


class Course extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: "",
      eingeschrieben: false,
      courseName: "",
      courseDescription: "",
      isFree: false,
      articles: [],
      members: []
      };
    }
  componentDidMount() {
  this.setState({
    user: this.props.user.email
  })

  var course_name = window.location.pathname.split("/")[2];
  course_name = course_name.replace("%20", " ");

  var course = api.getCourse(course_name);
  course.then(course => {
    this.setState({
      courseName: course_name,
      courseDescription: course.description,
      isFree: course.isFree
    })
  })

  //check if joined course or note
  api.getAllCoursesOfUser(this.props.user.email).then(res1 => {
      console.log(res1)
      if (res1.some(item => item != null && item.name === this.state.courseName)) {

        this.setState({
          eingeschrieben: true
        })


        //Leave course
        var email = this.props.user.email
        if (this.state.eingeschrieben) {
            var leave = document.getElementById("leavecourse");
            leave.addEventListener("click", joincroup => {
              api.unenrollUser(email, this.state.courseName).then(res => {
                window.location.reload(false);
              });
            })
        //get all feed articles
        api.getAllArticlesOfCourse(this.state.courseName).then(res => {
          this.setState({articles : res.reverse()})
        });

        //get all course members
        fetch('/course/'+this.state.courseName+'/user', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(res => res.json()).then(res1 => {
            this.setState({members : res1.reverse()})
            })

        //post articles
            var teilen = document.getElementById("teilen");
            if (teilen) {
              teilen.addEventListener("click", share => {
                var text = document.getElementById("textteilen").value;
                api.createArticle(this.state.courseName, "", email, text, Date.now).then(res => {
                  window.location.reload(false);
                });
              })
            }
        }

      }
    })

    //Join course
    var email = this.props.user.email
    var myEle = document.getElementById("joincourse");
    if (myEle) {
      myEle.addEventListener("click", joincroup => {
        api.enrollUser(email, this.state.courseName).then(res => {
          window.location.reload(false);
        });
      })
    }

    //post articles
    var teilen = document.getElementById("teilen");
    if (teilen) {
      teilen.addEventListener("click", share => {
        var text = document.getElementById("textteilen").value;
        // api.enrollUser(email, this.state.courseName).then(res => {
        //   window.location.reload(false);
        // });
      })
    }

};

  render() {


    if(!this.state.eingeschrieben){
    return (
      <div>
    <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '60px', paddingLeft: '30px'}}>
        <div className="row">
            <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                <div className="row">
                    <div className="col" style={{paddingRight: '0', paddingLeft: '20px'}}>
                        <h1>{this.state.courseName}</h1>
                    </div>
                    <div className="col-4">
                    </div>
                    <div className="col" style={{paddingRight: '10px'}}>
                        <button id='joincourse' className='btn' style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>mich einschreiben</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="background container-fluid row">
        <div className="col col-sm-12" style={{paddingRight: '0', paddingLeft: '15px'}}>
            <div className="tab-content col-offset-6 centered" style={{marginBottom: '450px'}}>
                <div style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                    <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    );}


    else {
      return (
        <div>

            <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '54px', paddingLeft: '24px'}}>

                <div className="row">
                    <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                        <div className="row">
                            <div className="col" style={{paddingRight: '0', paddingLeft: '20px'}}>
                                <h1 style={{textTransform: 'capitalize'}}>{this.state.courseName}</h1>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col" style={{paddingRight: '10px'}}>
                                <button id='leavecourse' className='btn' style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>Abmelden</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="background-fluid" style={{borderBottom: '1px solid #e8e9eb'}}>
                  <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
                      <li className = "nav-item">
                          <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link tab-title" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link tab-title" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="memberstab" aria-selected="false">Teilnehmern</a>
                      </li>

                    </ul>
                </div>

            </div>
            <div className="background container-fluid row">
                <div className="col col-sm-12">
                    <div className="tab-content col-offset-6 centered" id="tab-content">

                        <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                            <p>{this.state.description}</p>
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> 16. April - 22. April </h3>
                            <p>Folie 01</p>
                            <p>Folie 02</p>
                        </div>

                        <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="memberstab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                        <ul>
                        {this.state.members.map(function(member, i) {
                           return <li style={{textTransform: 'capitalize'}} key={i}>{member.firstname} {member.lastname}</li>
                        })}
                        </ul>
                        </div>

                        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
                            <div className="col-12" id="new_status" style={{marginBottom : '20px'}}>
                                <div className="container">
                                    <div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
                                        <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
                                            <span className="glyphicon glyphicon-pencil"></span> Text teilen
                                        </div>
                                        <div className="col-4" style={{textAlign: 'center'}}>
                                            Foto Hochladen
                                        </div>
                                        <div className="col-4" style={{textAlign: 'center'}}>
                                            Datei Hochladen
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" id="post_content">
                                    <div className="textarea_wrap">
                                        <textarea id='textteilen' className="col-xs-11" style={{width: '100%'}} placeholder="write something..."></textarea>
                                    </div>
                                </div>
                                <div className="col-xs-12" id="post_footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <button id='teilen' className="btn btn-primary" style={{float: 'right', marginBottom: '10px'}}>Teilen</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='container' id="userposts">

                            {this.state.articles.map(function(article, i) {
                               return <div key={i} className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
                                <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                                   <div className='row'>
                                       <div className='col-6' style={{textTransform: 'capitalize'}}>
                                       {article.author.firstname} {article.author.lastname}
                                        </div>
                                        <div className='col-6'>
                                               <p style={{float: 'right'}}>10 min</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                       <p style={{color: '#a9a8a8'}}>{article.text}</p>
                                   </div>
                               </div>
                            })}
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

export default Course;
