import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom'

const api = require('../../api');


export class Beschreibung extends Component{
	constructor(props) {
		super(props);
		this.state = {
			description: this.props.description,
		}
	}

	
	render(){
		return(
		<div className="row" style={ { border: '1px solid rgb(232, 233, 235)'} }>
					<div className="box col-12">
						<div className="box-title">
							Beschreibung
						</div>
						<div>
							{this.props.description}
						</div>
					</div>
				  </div>
		
		);
	}
}