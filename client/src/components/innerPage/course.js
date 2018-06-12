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
      isFree: false
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

  fetch('/user/' + this.props.user.email + '/course', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json()).then(res1 => {
      console.log(res1.some(item => item.name === this.state.courseName));
      if (res1.some(item => item.name === this.state.courseName)) {
        // this.state.eingeschrieben = true;
        this.setState({
          eingeschrieben: true
        })

        //Leave course
        var email = this.props.user.email
        if (this.state.eingeschrieben) {
            var leave = document.getElementById("leavecourse");
            console.log('leave')
            leave.addEventListener("click", joincroup => {
              api.unenrollUser(email, this.state.courseName).then(res => {
                window.location.reload(false);
              });
            })
        } else {
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

};

  render() {

    //Checks if there is an active UserSession
    fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {
      if(res.status == 500){
        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60000), path: '/'})
      }
    });


    if(!this.state.eingeschrieben){
    return (
      <div style={{backgroundColor: '#f7f8fa'}}>


      <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '60px', paddingLeft: '30px'}}>
        <div className="row">

          <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
            <div className="row" style={{backgroundColor: 'white'}}>
                  <div className="col" style={{backgroundColor: 'white', paddingRight: '0', paddingLeft: '20px'}}>
                  <h1>{this.state.courseName}</h1>
                  </div>
                  <div className="col-4" style={{backgroundColor: 'white'}}>
                  </div>
                  <div className="col" style={{backgroundColor: 'white', paddingRight: '10px'}}>
                    <button id='joincourse' style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>mich einschreiben</button>
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>
              </div>

              <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>

              <div className="col-12" id="new_status" style={{marginBottom : '20px'}}>

<div className="container">
                <div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
                    <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
                    <span className="glyphicon glyphicon-pencil"></span>
                      Text teilen
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
                <div className="textarea_wrap"><textarea className="col-xs-11" placeholder="write something..."></textarea></div>
                </div>

                <div className="col-xs-12" id="post_footer">
                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-primary" style={{float: 'right', marginBottom:'10px'}}>Teilen</button>
                    </div>
                    </div>
                </div>
</div>

              <div className='container' id="userposts">
                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom:'20px'}}>
                      <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                          <div className='row'>
                            <div className='col-6'>
                              Mariano Brey
                            </div>
                            <div className='col-6'>
                              <p style={{float:'right'}}>10 min</p>
                            </div>
                          </div>
                      </div>
                      <div className='col-12'>
                          <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                          mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                          omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                          splendide moderatius, eos ei movet semper elaboraret.</p>
                      </div>
                </div>

                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px'}}>
                      <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                          <div className='row'>
                            <div className='col-6'>
                              Anton Gulenko
                            </div>
                            <div className='col-6'>
                              <p style={{float:'right'}}>35 min</p>
                            </div>
                          </div>
                      </div>
                      <div className='col-12'>
                          <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                          mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                          omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                          splendide moderatius, eos ei movet semper elaboraret.</p>
                      </div>
                </div>
              </div>

              </div>
            </div>
        </div>

      </div>

      </div>
    );}


    else {
      return (
        <div style={{backgroundColor: '#f7f8fa'}}>

            <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '60px', paddingLeft: '30px'}}>

            <div className="background-fluid" style={{backgroundColor: '#f7f8fa', borderBottom: '1px solid #e8e9eb'}}>
      <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
          <li className = "nav-item">
              <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
          </li>

          <li className="nav-item">
              <a className="nav-link tab-title" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
          </li>

        </ul>
    </div>



                <div className="row">
                    <div className="col" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                        <div className="row" style={{backgroundColor: 'white'}}>
                            <div className="col" style={{backgroundColor: 'white', paddingRight: '0', paddingLeft: '20px'}}>
                                <h1 style={{textTransform: 'capitalize'}}>{this.state.courseName}</h1>
                            </div>
                            <div className="col-4" style={{backgroundColor: 'white'}}>
                            </div>
                            <div className="col" style={{backgroundColor: 'white', paddingRight: '10px'}}>
                                <button id='leavecourse' style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2'}}>Abmelden</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background container-fluid row">
                <div className="col col-sm-12" style={{paddingRight: '0', paddingLeft: '0'}}>
                    <div className="tab-content col-offset-6 centered" id="tab-content">
                        <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                            <p>{this.state.description}</p>
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> 16. April - 22. April </h3>
                            <p>Folie 01</p>
                            <p>Folie 02</p>
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
                                        <textarea className="col-xs-11" placeholder="write something..."></textarea>
                                    </div>
                                </div>
                                <div className="col-xs-12" id="post_footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <button className="btn btn-primary" style={{float: 'right', marginBottom: '10px'}}>Teilen</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container' id="userposts">
                                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom: '20px'}}>
                                    <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                                        <div className='row'>
                                            <div className='col-6'>
                                                Mariano Brey
                                            </div>
                                            <div className='col-6'>
                                                <p style={{float: 'right'}}>10 min</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte, mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus splendide moderatius, eos ei movet semper elaboraret.</p>
                                    </div>
                                </div>
                                <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px'}}>
                                    <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                                        <div className='row'>
                                            <div className='col-6'>
                                                Anton Gulenko
                                            </div>
                                            <div className='col-6'>
                                                <p style={{float: 'right'}}>35 min</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte, mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus splendide moderatius, eos ei movet semper elaboraret.</p>
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

export default Course;
