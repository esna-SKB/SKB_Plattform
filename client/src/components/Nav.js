import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';


class Nav extends Component {




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
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Esna</Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li><button className="btn btn-danger">Log out </button></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
