import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import Meow from'../img/meow.png';
import '../css/timeline.css';
import AllCourses from './allCourses';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec, deleteUserSession } from '../utils/userSessionHelper';


class Timeline extends Component {

  constructor(props){
  super(props);
  this.state = {
    emailUser: null
    };
  }
  componentDidMount() {

    this.setState({
      emailUser: (this.props.location.state==null) ? "" : this.props.location.state.emailUser
    });
  }

  logout(){
    deleteUserSession(cookie.load('userID'));
  }

  // logout() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const obj = getFromStorage('the_main_app');
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // Verify token
  //     fetch('/api/account/logout?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token: '',
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

  render() {

    //Checks if there is an active UserSession
    fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {

      if(res.status == 500 || res.status == 202){

        this.props.history.push("/");
      }else{

        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(600*20), path: '/'})

      }
    });

    return (
    <div style={{backgroundColor: '#f7f8fa'}}>
      <nav className="navbar navbar-expand-sm" style={{backgroundColor: 'white'}}>
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img id="logo" className="logo" src={Logo} alt="Logo"/></a>

          </div>

          <form className="navbar-form navbar-center" action="/search">
            <div className="input-group">
              <div className="input-group-btn">
                <button className="searchbutton btn" type="submit"></button>
              </div>
              <input type="text" className="searchbar form-control" placeholder="Search" name="srch-term" id="srch-term"/>
            </div>
          </form>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><img id="chat" className="icon" src={Chat} alt="Chat"/></a></li>
            <li><a href="#"><img id="notifications" className="icon" src={Bell} alt="Bell"/></a></li>
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {(this.props.location.state==null) ? "You seem to be logout out this is a bug" : this.props.location.state.emailUser}
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="/profile">Mein Profil</a>
                <a class="dropdown-item" href="/settings">Einstellungen</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-danger" onClick={this.logout} href="/">Log Out</a>
              </div>
            </div>
          </ul>

        </div>
      </nav>


      <div className="background-fluid background">
        <ul className="nav nav-tabs justify-content-center col-12 centered" id="mytabs" role="tablist">
            <li className= "nav-item">
                <a className="tab-title nav-link active" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="true">Timeline</a>
            </li>



            <li className="nav-item">

                <a className="tab-title nav-link" id="kurse-tab" data-toggle="tab" href="#kurse" role="tab" aria-controls="kurse" aria-selected="false">Kurse</a>
            </li>


            <li className="nav-item">

                <a className="tab-title nav-link" id="gruppen-tab" data-toggle="tab" href="#gruppen" role="tab" aria-controls="gruppen" aria-selected="false">Gruppen</a>
            </li>
          </ul>
      </div>

      <div className="container-fluid">

      <div className="cols background row">

        <div className="col-md-3">

          <div className="row">
            <a className="box col-12 text-center" href="/profile">
				<div className="profilepicleft fill" ><img src={Meow} alt="meow" ></img></div>
				<p></p><p><strong id="YourName01">SKB User</strong></p>
            </a>
          </div>

          <div className="row">
            <div className="box col-sm-6 text-center">
              <strong>2</strong><br /><small className="text-muted">Kurse</small>
            </div>
            <div className="box col-sm-6 text-center">
              <strong>5</strong><br /><small className="text-muted">Gruppen</small>
            </div>
          </div>

          <div className="row">
            <div className="box course-box col-12">
              <div className="box-title">
                Meine Kurse
              </div>

              <div className="courses">
                <a className="course-name" href="/course"> Französisch A2.1 </a>
                <a className="course-name" href="/course"> Italienisch A1.1 </a>
              </div>
            </div>
          </div>

        </div>

        <div className="col-md-3 order-md-last">

          <div className="row">

            <div className="box col-12">
              <div className="box-title">
                Kurs Leitern Kontaktieren
              </div>
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <div className="tab-content" id="tab-content">
              <div className="tab-pane fade show active" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                <div className="box">
                <h3> Timeline </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>
                  </div>
              </div>

              <div className="tab-pane fade" id="kurse" role="tabpanel" aria-labelledby="kurse-tab">
                  <div className="box">
                  <AllCourses myEmail={(this.props.location.state==null) ? "" : this.props.location.state.emailUser}/>

                  <h3> Kurse </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.

                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>
                </div>
              </div>



              <div className="tab-pane fade" id="gruppen" role="tabpanel" aria-labelledby="gruppen-tab">

                  <div className="box">


                  <h3> Gruppen </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.


                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>
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

export default Timeline;
