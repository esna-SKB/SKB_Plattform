import React from 'react';
import { Link, NavLink } from 'react-router-dom'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function getChannels(route, cb) {
  return fetch(route)
    .then(status)
    .then((response) => response.json())
    .then((channels) => {
      cb(channels)
    })
    .catch((error) => {
      console.error(error);
    });
}

function CreateChannelButton(props) {
  const isTeacher = props.isTeacher;
  if (isTeacher) {
    return (
      <div className="row">
        <div className='col-12' style={ { borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px' } }>
          <div className='row'>
            <div className='col'>
              <Link to={ `/createchannel` } className='whitehover' style={ { color: 'white !important' } }>
                <div className='registrieren_botton' style={ { marginTop: '-6px', fontSize: '16px', float: 'none', margin: '0 auto', width: '160px' } }>
                  + Channel anlegen
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      );
  } else {
    return (null);
  }
}

function Element(props) {
  const channel = props.channel;
    return (
      <div className="box">
        <div className="w-100 course-name">
          <Link to={ `/channel/${channel._id}` }>
            { channel.name }
          </Link>
        /*  <Link className="float-right" to={ `/courses/${group.course.name}` }>
            { group.course.name }
          </Link>*/
        </div>
      </div>
      );
  }


export class MyChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    if (this.props.myEmail != null) {

      getGroups ('/user/' + this.props.myEmail + '/channel'
        , (channels) => {
          this.setState({
            list: channels.map((e) => {
              return ( <Element key={ e._id } channel={ e } />);
            })
          });
        });
    }
  }

  render() {
    return (
      <div className="box course-box col-12">
        <div className="box-title">
          Meine Channels
        </div>
        <div className="channels">
          { this.state.list }
        </div>
      </div>
      );
  }
}


class OtherChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    
    if (this.props.user.isTeacher === true) {
      getChannels('/channel'
        , (channel) => {
          this.setState({
            list: channels.map((e) => {
              return ( <Element key={ e._id } channel={ e } />);
            })
          });
        });
    }
    
    else {
      return null;
    }
  }

  render() {

    return (
      <div className="box course-box col-12">
        <div className="box-title">
          Alle Channel
        </div>
        <div className="channel">
          { this.state.list }
        </div>
      </div>
      );
  }
}


class Channel extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		 user: this.props.user
		}; 
	}



	render(){
		return(
			<div>
				<CreateChannelButton isTeacher={ this.props.user.isTeacher } />
				<MyChannels myEmail={ this.props.user.email} myId = {this.props.user._id} />
				<OtherChannels user={ this.props.user } />
			</div>
			);
	}
}

export default Groups; 