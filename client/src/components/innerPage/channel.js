import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import api from '../../api';
import dragula from 'dragula';
import Chat from '../../img/chat-icon.png';


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

class MemberTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.channel,
      members: undefined
    }
    this.handleUpdateMembers = this.handleUpdateMembers.bind(this)
  }

  componentDidMount() {
    this.handleUpdateMembers(this.props.channel._id)
  }

  componentWillReceiveProps(nextProps) {
    this.handleUpdateMembers(nextProps.channel._id)
    if (this.props.channel._id !== nextProps.channel._id) {
      this.handleUpdateMembers(nextProps.channel._id)
    }
  }

  handleUpdateMembers = (channelId) => {
    api.getAllMembersOfChannel(channelId).then(res => {
      this.setState({
        members: res.reverse()
      })
	  console.log(this.state.members)
    })
  }

  render() {
    const members = this.state.members;
    if (members && (this.props.isAdmin|| this.props.isTeacher)) {
      return (
		 <div className=" box tab-pane fade" id="abgaben" role="tabpanel" aria-labelledby="abgabentab" style={{ padding: '20px'}}>
          <ul>
            { members.map(function(member, i) {
				if(members.length === 0){
					return <div>Keine Teilnehmer</div>;
				}	else{
					console.log(members)	
				}
				
                return <li className='clearfix' style={ { textTransform: 'capitalize' } } key={ i }>
                         <Link to={ `/user/${member.email}` }>
                           { member.firstname } { member.lastname }
                         </Link>
                         <Link className='float-right' to={ `/messages/${member.email}` }>
                           <img id="chat" className="icon" src={ Chat } alt="Chat" />
                         </Link>
                       </li>
              }) }
          </ul>
        </div>
      )
    } else {
      return null;
    }
  }
  
}

class EnrollButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: props.enrolled,
      user: props.user,
      channel: props.channel
    }
  }

  leaveCourse = () => {
    api.unenrollUser(this.props.user.email, this.props.channel._id).then(res => {
      window.location.reload(false);
    });
  }

  joinCourse = () => {
    api.enrollUser(this.props.user.email, this.props.channel._id, 'Channel').then(res => {
      window.location.reload(false);
    });
  }

  render() {
    const {enrolled, user, channel} = this.props;
    if (user.isTeacher || user.isAdmin) {
        return (
          <button id={ (enrolled) ? 'leavecourse' : 'joincourse' } className='btn' onClick={ (enrolled) ? this.leaveCourse : this.joinCourse } style={ { position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '8%', borderRadius: '20px', padding: '10px 30px', border: '1px solid #007fb2', color: '#007fb2' } }>
            { (enrolled) ? 'Abmelden' : 'mich einschreiben' }
          </button>
          );
    } else {
      return null;
    }
  }
}


class FeedTab extends Component{
	constructor(props) {
		super(props);
		this.state = {
			channelId: this.props.channel._id,
			channelName:this.props.channel.name,  
			articles: undefined,
			file: undefined
		}
	}
	
	  componentDidMount() {
		this.handleArticlesUpdate(this.props.channel._id)
	  }
	  componentWillReceiveProps(nextProps) {
		if (this.props.channel.name !== nextProps.channel.name) {
		  this.handleArticlesUpdate(nextProps.channel._id)
		}
	  }

	  handleArticlesUpdate = (channelId) => {
		api.getAllArticles(channelId)
		  .then(res => {
			  if(res !== undefined){
				this.setState({
				  articles: res.reverse()
				})
			  }else{
				this.setState({
					articles: []
				})	
			  }
		  });
	  }

    postArticle = () =>{
		var text = document.getElementById("textteilen").value;
		var self = this;
		if (!this.state.file) {
		  api.createArticle(self.props.channel._id,'Channel', self.state.channelName, "", self.props.user.email, text, "", Date.now, "")
			.then(res => {
			  self.handleArticlesUpdate(self.props.channel._id)
			  document.getElementById("textteilen").value = ""
			});
		} else {
		  self.getBase64(self.state.file, function(base64file) {

			api.createArticle(self.props.channel._id,'Channel', self.state.channelName, "", self.props.user.email, text, self.state.file.type, Date.now, base64file)
			  .then(res => {
				self.handleArticlesUpdate(self.props.channel._id)
				document.getElementById("textteilen").value = ""
				self.setState({
				  file: undefined
				})
			  });
		  });
		}
    }

    getBase64(file, cb) {
      if(!file) return cb("");
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
         //console.log(reader.result);
         cb(reader.result)
       };
       reader.onerror = function (error) {
         console.log('Error: ', error);
       };
    }

    fileUploader = (event) => {
      this.setState({
        file: event.target.files[0]
      });
      
      //console.log(event.target.files[0])
    }

    render(){
		const articles = this.state.articles;
		if(!articles){
				return null;
		}else{
			
			return(
			
    
			  <div className="tab-pane fade show active" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
				<div className="col-12" id="new_status" style={{marginBottom : '20px'}}>
				  <div className="container">
					<div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
					  <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
						<span className="glyphicon glyphicon-pencil"></span> Text teilen
					  </div>
					</div>
				  </div>
				  <div className="col-12" id="post_content">
					<div className="textarea_wrap">
					  <textarea id='textteilen' className="col-xs-11" style={{width: '100%'}} placeholder="write something..."></textarea>
					  <input type="file" className ="file" onChange={this.fileUploader}/>
					</div>
				  </div>
				  <div className="col-xs-12" id="post_footer">
					<div className="row">
					  <div className="col-12">
						<button id='teilen' className="btn btn-primary" onClick= {this.postArticle} style={{float: 'right', marginBottom: '10px'}}>Teilen</button>
					  </div>
					</div>
				  </div>
				</div>
				<div className='container' id="userposts">
					{ articles.map(function(article) {
						return ( <Article key={ article._id } user={ this.props.user.email } article={ article } />);
						}, this) }
				</div>
			  </div>
			);
		}
	} 
}

class Channel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
			user: this.props.user,
            isMember: false,
            channel: "",
            articles: undefined,
            members: [],
            file: null,
			description: "",
        };
    }
    
    componentDidMount(){
		console.log(this.props.location.pathname);
		var channelId = this.props.location.pathname.split("/")[2];
		this.handleUpdate(channelId); 
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname!==nextProps.location.pathname){
            var channelId = this.props.location.pathname.split("/")[2];
			console.log("this is prps" + channelId);
            this.handleUpdate(channelId);  
        }
    }
    
    handleUpdate(channelId) {
			//get channel
			console.log("we get channel")
			api.getChannel(channelId)
			.then(res => {
				this.setState({
					channel : res,
					description : res.description
				});
				console.log(res)
			//check if member
			api.checkEnrolledUser(this.state.user.email,channelId)
			.then( res => 
				{
					console.log(res.success)
					this.setState({
						isMember: res.success
					})
				})
		})
	}
 
    
    render() {
		
			
        if(!this.state.channel /*|| !this.state.articles*/){
            return null;
         }else if(this.state.user.isTeacher === false && this.state.user.isAdmin === false){
           return null;
        }else{
		
            return (
            <div className="row">
				<div className=" col col-md-8" style={ { paddingRight: '0', paddingLeft: '0' ,paddingTop: '20px'} }>
				  <div className="container-fluid" style={ { marginBottom: '20px', paddingRight: '54px', paddingLeft: '24px' } }>
					<div className="row">
					  <div className="col" style={ { backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px' } }>
						<div className="row">
						  <div className="col-7" style={ { paddingRight: '0', paddingLeft: '20px' } }>
							<h1 style={ { textTransform: 'capitalize' } }>{ this.state.channel.name }</h1>
						  </div>
						  <div className="col-4" style={ { paddingRight: '10px' } }>
							<EnrollButton user={ this.props.user } channel={ this.state.channel } enrolled={ this.state.isMember } />
						  </div>
						</div>
					  </div>
					</div>
					<div className="background-fluid" style={ { borderBottom: '1px solid #e8e9eb' } }>
					  <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
						<li className="nav-item">
						  <a className="nav-link tab-title active" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="true">Feed</a>
						</li>
						<li className="nav-item">
						  <a className="nav-link tab-title" id="abgaben-tab" data-toggle="tab" href="#abgaben" role="tab" aria-controls="abgabentab" aria-selected="false">Teilnehmer</a>
						</li>
					  </ul>
					</div>
				  </div>
				  <div className="container-fluid row">
					<div className="col col-sm-12">
					  <div className="tab-content col-offset-6 centered">
						  <div className="clearfix">
							<div className="d-block d-md-none order-md-last justify-content-center">
							  <div>
								<Beschreibung location={ this.props.location } description={ this.state.description }/>
							  </div>
							</div>
						
							<MemberTab isTeacher={ this.state.user.isTeacher } isAdmin={this.props.user.isAdmin} channel={ this.state.channel }  location={this.props.location} user={this.props.user}/>
							<FeedTab isMember={  this.state.isMember } user={ this.props.user } channel={ this.state.channel } isAdmin={ this.props.user.isAdmin} />
						  </div>
					  </div>
					</div>
				  </div>
				</div>
				
				<div className="d-none d-md-block col-md-4 order-md-last" style={ { paddingRight: '0', paddingLeft: '0'} }>
					<div style={ { paddingTop: '20px' } }>
					  <Beschreibung location={ this.props.location } description={ this.state.description }/>
					</div>
				</div>
		</div>
      );
    }
  }
}


export default Channel;
