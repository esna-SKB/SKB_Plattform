import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../../css/messages.css';


const api = require('../../api');


class Suggestions extends React.Component {
  render() {
    const options = this.props.results.map(r => (
      <ElementPartner key={ r.email } user={ this.props.user } partner={ r.email } />
    ))
    return <div>
             { options }
           </div>
  }
}

export class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      location: this.props.location,
      query: '',
      matches: [],
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query.length > 0) {
          this.getInfo()
      }
      else{
        this.setState({
          matches : []
        })
      }
    })
  }

  getInfo = () => {
        const matches = this.props.allUsers.filter(s =>
          s.firstname.startsWith(this.state.query) || s.lastname.startsWith(this.state.query) || s.email.startsWith(this.state.query)
        );
        this.setState({
          matches : matches
        })
  }

  render(){
    return(
      <div>
        <input id='newChatPartner' className="form-control" placeholder="Suche nach Mitglied..." ref={ input => this.search = input } onChange={ this.handleInputChange } list="json-datalist"
        />
        <Suggestions results={ this.state.matches} user={this.props.user} />
      </div>
    )
  }
}

class ElementPartner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partner: ""
    }
  }
  componentDidMount() {
    api.getUser(this.props.partner)
      .then(res => {
        this.setState({
          partner: res
        })
      })
  }
  render() {
    const { partner } = this.state; 
    return (
      <div className="contentChatPartnerlist">
        <Link to={ `/messages/${partner.email}` } style={{ textDecoration: 'none'}} >
          <div style={ { clear: "both" } } className="contentChatPartnerlist">
            <img className="contentChatPartnerlist" src={ partner.picturedata } alt="profilepicture" />
            <span className="contentChatPartnerlistElem course-name w-100">{ partner.firstname } { partner.lastname }</span>
          </div>
        </Link>
      </div>
      );
  }
}
class ConversationPartners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationPartners: []
    }
  }
  componentDidMount() {
    api.getConversationPartners(this.props.user.email)
      .then(res => {
        this.setState({
          conversationPartners: res.map((e) => {
            return ( <ElementPartner key={ e } user={ this.props.user } partner={ e } />);
          })
        })
      })
  }
  render() {
    const {conversationPartners} = this.state; 
    return (
      <div>
        { conversationPartners }
      </div>
      );
  }
}
export class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      allUsers: []
    };
  }

  componentDidMount() {
    api.getAllUsers()
      .then(res => {
        this.setState({
          allUsers: res
        })
      })
  }

  render() {
    const allUsers = this.state.allUsers; 
    return (
      <div className="box col-12">
        <div className="container" style={ { backgroundColor: 'white' } }>
          <div className="box-title"> Neue Nachricht </div>
          <div>
            <NewMessage user={ this.props.user } history = {this.props.history} allUsers = {allUsers} />
          </div>
          <div className="box-title"> Meine Nachrichten </div>
          <div>
              <ConversationPartners user={ this.props.user } />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MessageList)
