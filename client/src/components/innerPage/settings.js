import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/timeline.css';
import '../../css/profile.css';
/*add this css if you want the profile image on the left (circular)*/
import '../../css/profilepicture.css';
// import Meow from'../../img/meow.png';

import cookie from 'react-cookies';
import { updateTimeSec } from '../../utils/userSessionHelper';


class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  user: this.props.user
		}
	}



  render() {

    //Checks if there is an active UserSession
   fetch('/userSession/check', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( { token: cookie.load('userID') } )
    }).then (res => {

      if(res.status === 500){


        this.props.history.push("/");
      }else{
        cookie.save('userID', cookie.load('userID'), {expires: updateTimeSec(60), path: '/'})

      }
    });

    return (
      <div>

      <div className="container-fluid">

      <div className="background row">

        <div className="col col-sm-12">
				<div className="row box ">
					<div className="col-12">
						<div className="col-12">
							<h4 className="row">Einstellungen</h4>

							<div className="row"><Link to={`/user/${this.props.user.email}/changepassword`} className="text-muted">Passwort ändern</Link></div>
							<div className="row"><Link  to={`/user/${this.props.user.email}/edit`} className="text-muted">Profil bearbeiten</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Kontaktdaten ändern</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Mitteilungenkonfigurationen</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Sicherheitsschlüssel</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Feedback</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Kalendereinstellungen</Link></div>
							<div className="row"><Link  to={``} className="text-muted">Kalendereinstellungen</Link></div>

						</div>

						<div className="row-12 text-muted text-right">
							<div className="col-12">
								<Link  to={`/`}>home</Link>
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

export default Settings;
