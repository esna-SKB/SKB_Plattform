import React from 'react';

import Meow from'../../img/meow.png';


class SmallProfile extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}



	render(){
		return(
			<div>
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
	        </div>
			);
	}
}

export default SmallProfile; 