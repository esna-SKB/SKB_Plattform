import React from 'react';
import { Link } from 'react-router-dom'

import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
import '../../css/timeline.css';

class Header extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		}; 
	}


	render(){
		return(
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
		                {this.props.user.firstname +" "+ this.props.user.lastname}
		              </button>
		              <div className="dropdown-menu">
		                <a className="dropdown-item" href="/profile">Mein Profil</a>
		                <a className="dropdown-item" href="/settings">Einstellungen</a>
		                <a className="dropdown-item" href="#">Something else here</a>
		                <div className="dropdown-divider"></div>
		                <a className="dropdown-item text-danger" onClick={this.logout} href="/">Log Out</a>
		              </div>
		            </div>
		          </ul>
		        </div>
		      </nav>

			);
	}
}

export default Header; 