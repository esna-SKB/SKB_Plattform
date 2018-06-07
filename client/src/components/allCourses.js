import React from 'react';
import ReactDOM from 'react-dom';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}


function getCourses(route, cb){
		return fetch(route)
			.then(status)
		    .then((response) => response.json())
		    .then((courses)=>{
		    	cb(courses)
		    })
		    .catch((error) => {
		      console.error(error);
	    });
      }

function Element(props) {
	const e = props.name;
	const type = props.ctype;  
	return (
		<p>{e}</p>
		); 
}

class MyCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		list: []
		}; 
	}
	componentDidMount(){
		console.log("didMount call");
		let i = 0; 
		if(this.props.myEmail!=null){

			getCourses('/user/'+this.props.myEmail+'/course'
				, (courses) =>{
					console.log("meine Kurse: " + courses); 
					this.setState({list: courses.map((e)=>{ return( <Element key={i++} ctype={"MyCourses: "} name={e.name}/>);})});
				});
		}
	}

	render(){
		return(this.state.list); 
	}
}
class OtherCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		list: [] 
		}; 
	}

	componentDidMount(){
		console.log("didMount call OtherCourses");
		let i = 0; 
		getCourses('/course'
			, (courses) =>{
				console.log("other Kurse: " + courses);
				this.setState({list: courses.map((e)=>{ return( <Element key={i++} name={e.name}/>);})});
			});
		
	}

	render(){

		return(this.state.list);
	}
}

class AllCourses extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: this.props.myEmail
		}; 
	}
	render(){
		console.log("AllCourses: "+ this.props.myEmail); 
		return(
			<div>
				<h3> Meine Kurse </h3>
				<MyCourses myEmail={this.props.myEmail}/>
				<h3> Alle Kurse </h3>
				<OtherCourses/>
			</div>

			);
	}
}

export default AllCourses; 