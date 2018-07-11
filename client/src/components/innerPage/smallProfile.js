import React from 'react';
import { Link } from 'react-router-dom'


class SmallProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };

  }
  
  componentDidMount(){
	  	if(this.state.user.isAdmin){
	   document.getElementById("role").innerHTML = "Admin";	
	}else if (this.state.user.isTeacher) {
      document.getElementById("role").innerHTML = "Lehrer_in";
	}else{
	   document.getElementById("role").innerHTML = "Student_in"; 
	}
  }
  
  componentWillReceiveProps(nextProps) {
    //console.log("SimpleProfile, we need to take carre her, dont update to much")
    this.setState({
      user: nextProps.user
    });

  }
  

  render() {
    return (
      <div>
        <div className="row" style={ { border: '1px solid rgb(232, 233, 235)'} }>
          <div className="box col-12 text-center">
            <Link to={ `/user/${this.props.user.email}` }>
              <div className="profilepicleft fill">
                <img id="cirleProfile" src={ this.state.user.picturedata } alt="Profile Bild"></img>
              </div>
              <p></p><p><strong id="YourName01">{ this.props.user.firstname + " " + this.props.user.lastname }</strong></p>
            </Link>
			 <div className = "text-muted">
				<p className="lineup" id="role"></p>
			 </div>
          </div>
		 
        </div>
	
        { /*<div className="row" style={{border: '1px solid rgb(232, 233, 235)', borderTop: 'transparent'}}>
                      	            <div className="box col-sm-6 text-center">
                      	              <strong>2</strong><br /><small className="text-muted">Kurse</small>
                      	            </div>
                      	            <div className="box col-sm-6 text-center">
                      	              <strong>5</strong><br /><small className="text-muted">Gruppen</small>
                      	            </div>
                      	          </div>*/ }
      </div>
      );
  }
}

export default SmallProfile;
