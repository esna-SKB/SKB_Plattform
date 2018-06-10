import React from 'react';
import { Link } from 'react-router-dom'

import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
import '../../css/timeline.css';

import cookie from 'react-cookies';
import { deleteUserSession } from '../../utils/userSessionHelper';

class Header extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		}; 
	}
	logout(){
		deleteUserSession(cookie.load('userID'));
		this.props.history.push("/");
	}

	render(){
		return(
			<nav className="navbar navbar-expand-sm" style={{backgroundColor: 'white'}}>
		        <div className="container-fluid">
		          <div className="navbar-header">
		            <Link className="navbar-brand" to={`/`}><img id="logo" className="logo" src={Logo} alt="Logo"/></Link>

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
		            <li><Link to={`/messages`}><img id="chat" className="icon" src={Chat} alt="Chat"/></Link></li>
		            <li><Link to={`/dontknowtowhere`}><img id="notifications" className="icon" src={Bell} alt="Bell"/></Link></li>
		            <div className="btn-group">
		              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                {this.props.user.firstname +" "+ this.props.user.lastname}
		              </button>
		              <div className="dropdown-menu">
		                <Link className="dropdown-item" to={`/profile`}>Mein Profil</Link>
		                <Link className="dropdown-item" to={`/settings`}>Einstellungen</Link>
		                <Link className="dropdown-item" to={`/#`}>Something else here</Link>
		                <div className="dropdown-divider"></div>
		                <Link className="dropdown-item text-danger" onClick={this.logout} to={`/`}>Log Out</Link>
		              </div>
		            </div>
		          </ul>
		        </div>
		      </nav>

			);
	}
}

export default Header; 