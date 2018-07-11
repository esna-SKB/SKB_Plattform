import React from 'react';
import { Link } from 'react-router-dom'

import Logo from '../../img/esna.png';
import Bell from '../../img/bell-icon.png';
import Chat from '../../img/chat-icon.png';
import '../../css/timeline.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {

    return (
      <nav className="navbar navbar-expand-sm" style={ { backgroundColor: 'white', boxShadow: '0 0px 3px 0 rgba(0,0,0,.18), 0 2px 11px 0 rgba(0,0,0,0.05)' } }>
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to={ `/` }><img id="logo" className="logo" src={ Logo } alt="Logo" /></Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to={ `/messages` }><img id="chat" className="icon" src={ Chat } alt="Chat" /></Link>
            </li>
            <li>
              <Link to={ `/dontknowtowhere` }><img id="notifications" className="icon" src={ Bell } alt="Bell" /></Link>
            </li>
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { this.props.user.firstname + " " + this.props.user.lastname }
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to={ `/user/${this.props.user.email}` }>Mein Profil</Link>
                <Link className="dropdown-item" to={ `/settings` }>Einstellungen</Link>
                <Link className="dropdown-item" to={ `/#` }>Something else here</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item text-danger" onClick={ this.props.handleLogout } to={ `/` }>Log Out</Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>

      );
  }
}

export default Header;
