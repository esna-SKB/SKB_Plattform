import React from 'react';


class TeacherInfo extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		}; 
	}



	render(){
		return(
			<div className="row">
	            <div className="box col-12">
	              <div className="box-title">
	                Kurs Leitern Kontaktieren
	              </div>
	            </div>
	          </div>
			);
	}
}

export default TeacherInfo; 