import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import '../css/timeline.css';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../utils/userSessionHelper'; 


class Timeline extends Component {




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
      
      if(res.status == 500){


        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})
        
      }
    });

    return (
      <div>
      <nav className="navbar navbar-expand-sm">
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
          </ul>

        </div>
      </nav>

      <div className="background container-fluid">
        <ul className="nav justify-content-center">
            <li className="menu-item nav-item">
                <a className="nav-link" href="#">Lehrer</a>
            </li>
            <li className="menu-item nav-item">
                <a className="nav-link" href="#">Kurse</a>
            </li>
            <li className="menu-item nav-item">
                <a className="nav-link" href="#">Gruppen</a>
            </li>
            <li className="menu-item nav-item">
                <a className="nav-link" href="#">Kalendar</a>
            </li>
        </ul>
      </div>



      <div className="background container-fluid row">

        <div className="col col-sm-3">
          <div className="row">
            <div className="box col-sm-12 text-center">
            <strong>SKB User</strong>
            </div>
          </div>
          <div className="row">
            <div className="box col-md-6 text-center">
              <strong>2</strong><br /><small className="text-muted">Kurse</small>
            </div>
            <div className="box col-md-6 text-center">
              <strong>5</strong><br /><small className="text-muted">Gruppen</small>
            </div>
          </div>

        </div>

        <div className="col col-sm-6">
         <div className="row">
            <div className="box col-sm-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis quam. Nulla facilisi. Nulla suscipit ex ex, tristique gravida ligula finibus et. Donec dignissim venenatis mi quis congue. Phasellus sed laoreet orci. Cras ut fermentum massa. Suspendisse ultrices id lectus a convallis. Mauris elit nulla, commodo vitae neque eu, convallis pretium dolor.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis quam. Nulla facilisi. Nulla suscipit ex ex, tristique gravida ligula finibus et. Donec dignissim venenatis mi quis congue. Phasellus sed laoreet orci. Cras ut fermentum massa. Suspendisse ultrices id lectus a convallis. Mauris elit nulla, commodo vitae neque eu, convallis pretium dolor.</p>

            </div>
          </div>

          <div className="row">
            <div className="box col-sm-12">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis quam. Nulla facilisi. Nulla suscipit ex ex, tristique gravida ligula finibus et. Donec dignissim venenatis mi quis congue. Phasellus sed laoreet orci. Cras ut fermentum massa. Suspendisse ultrices id lectus a convallis. Mauris elit nulla, commodo vitae neque eu, convallis pretium dolor.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel iaculis quam. Nulla facilisi. Nulla suscipit ex ex, tristique gravida ligula finibus et. Donec dignissim venenatis mi quis congue. Phasellus sed laoreet orci. Cras ut fermentum massa. Suspendisse ultrices id lectus a convallis. Mauris elit nulla, commodo vitae neque eu, convallis pretium dolor.</p>

            </div>
          </div>
        </div>

        <div className="col col-sm-3">
            <div className="row">
            <div className="box col-sm-12">
              <h6>Kurs Leitern Kontaktieren</h6>


            </div>
          </div>
        </div>

      </div>

      </div>
    );
  }
}

export default Timeline;
