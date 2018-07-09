import React from 'react';
import { Link, NavLink } from 'react-router-dom'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function getGroups(route, cb) {
  return fetch(route)
    .then(status)
    .then((response) => response.json())
    .then((groups) => {
      cb(groups)
    })
    .catch((error) => {
      console.error(error);
    });
}

function Element(props) {
  const group = props.group;
  console.log("das ist die gruppe to show")
  console.log(group)
    return (
      <div className="box">
        <div className="w-100 course-name">
          <Link to={ `/group/${group._id}` }>
            { group.name }
          </Link>
          <Link className="float-right" to={ `/courses/${group.course.name}` }>
            { group.course.name }
          </Link>
        </div>
      </div>
      );
  }


export class MyGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    if (this.props.myEmail != null) {

      getGroups ('/user/' + this.props.myEmail + '/group'
        , (groups) => {
			console.log("my groups")
			console.log(groups)
          this.setState({
            list: groups.map((e) => {
              return ( <Element key={ e._id } group={ e } />);
            })
          });
        });
    }
  }

  render() {
    return (
      <div className="box course-box col-12">
        <div className="box-title">
          Meine Gruppen
        </div>
        <div className="groups">
          { this.state.list }
        </div>
      </div>
      );
  }
}

class Groups extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		 user: this.props.user
		}; 
	}



	render(){
		return(
			<div>
				<MyGroups myEmail={ this.props.user.email} myId = {this.props.user._id} />
			</div>
			);
	}
}

export default Groups; 