import React from 'react';
import '../../css/messages.css';
import socketIOClient from 'socket.io-client'
var os = require ('os')

const api = require('../../api');
class ChatPartner extends React.Component {
  render(){
    return(
      <div className="box-title">
          <div className="contentChatPartnerinfo">
            <img className="contentChatPartnerinfo" src={ this.props.partner.picturedata } alt="profilepicture"/>
            <span className="contentChatPartnerinfo">{ this.props.partner.firstname } { this.props.partner.lastname }</span>
          </div>
      </div>
    )
  }
}
class ElementMessage extends React.Component {

  render() {
    if (this.props.user.email === this.props.message.fromUser) {
      return (

        <div className="col-message-sent">
          <div className="message-sent">
            <p>
              { this.props.message.text }
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-message-received">
          <div className="message-received">
            <p>
              { this.props.message.text }
            </p>
          </div>
        </div>
      )
    }
  }
}

class Conversation extends React.Component {

  componentDidMount() {
    const divObj = document.getElementById('messageHistory');
    divObj.scrollTop = divObj.scrollHeight;
  }
  componentDidUpdate() {
    const divObj = document.getElementById('messageHistory');
    divObj.scrollTop = divObj.scrollHeight;
  }

  render() {
    const conversationMessages = this.props.history.map((e) => {
      return ( <ElementMessage key={ e._id || "temp:" + e.created_at } user={ this.props.user } message={ e } />);
    })

    return (
      <div id="messageHistory" className="messageHistory" style={ { maxHeight: '60vh', overflow: 'auto' } }>
        <div className="grid-message">
          { conversationMessages }
        </div>
      </div>
      );
  }
}

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // endpoint: os.hostname()+':5001',
      endpoint: os.hostname() + ":5001",
      partnerEmail: window.location.pathname.split("/")[2],
      history: undefined,
      partner: undefined
    };
    //falscher endpoint für server, this is allways localhost
    const socket = socketIOClient(this.state.endpoint);
    socket.on('send message', message => {
      if ((message.fromUser === this.props.user.email && message.toUser === this.state.partnerEmail) || (message.toUser === this.props.user.email && message.fromUser === this.state.partnerEmail)) {
        console.log("Von: " + message.fromUser + " Zu: " + message.toUser + " Text: " + message.text);
        this.addMessage(message);
      }
    })
  }

  componentDidMount() {
    api.getUser(this.state.partnerEmail)
      .then(res => {
        this.setState({
          partner: res
        })
      })
    api.getConversation(this.props.user.email, window.location.pathname.split("/")[2])
      .then((res) => {
        this.setState({
          history: res,
        })
      }
    )
  }

  sendMessage = (e) => {
    if (e.key === "Enter" && document.getElementById("messageContent").value !== "") {
      var text = document.getElementById("messageContent").value
      const socket = socketIOClient(this.state.endpoint);

      // this emits an event to the socket (server)
      var message = {
        fromUser: this.props.user.email,
        toUser: this.state.partnerEmail,
        text: text
      };
      socket.emit('send message', message);
      document.getElementById("messageContent").value = ""
    }
  }

  addMessage(message) {
    //Append msg to component state
    let newHistory = this.state.history.slice()
    newHistory.push(message)
    this.setState({
      history: newHistory
    })
  }

  render() {
    if (!this.state.history || !this.state.partner) {
      return false;
    } else {
      return (
        <div className="container" style={ { backgroundColor: 'white' } }>
          <ChatPartner partner = {this.state.partner}/>
          <Conversation user={ this.props.user } partnerEmail={ this.state.partnerEmail } history={ this.state.history } />
          <div className="compose">
            <input id="messageContent" placeholder="Deine Nachricht.." onKeyDown={ (e: KeyboardEvent<HTMLDivElement>) => this.sendMessage(e) } />
            <div className="compose-dock">
              <ul id="messages"></ul>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Messages
