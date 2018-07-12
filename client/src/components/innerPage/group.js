import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import api from '../../api';
import dragula from 'dragula';
import MemberInfo from './memberInfo';


class AbgabenTab extends Component{
	constructor(props) {
		super(props);
		this.state = {
			groupId: this.props.group._id,
			groupName:this.props.group.name,  
			abgaben: undefined,
			homeworks: undefined,
			file: undefined
		}
	}
	 
	 /** you can see a list of abgaben, which are part of a course (homework array) 
		homework is: homeworkId, deadline, file, maxpoints , activated(boolean)
	    abgabe is part of group , 
		abgabe: abgabeId, homeworkId, file, reachedpoints
		
		here you see a list of activated homeworks with their deadlines and if you have uploaded a abgabe for the homework, you will see ( a linkt to it), 
		you are able to upload a abgabe ( which is a pdf file) until deadline expires, you are able to change your abgabe(put request)
		
		
		under course/homeworks the teacher is able to see (as links) all the abgaben of all groups to the corresponding homeworks, upload new homeworks, activate homeworks, and grade abgaben with points,
	 ***/
	
	render(){
		return(
		
		 <div className="tab-pane fade" id="abgaben" role="tabpanel" aria-labelledby="abgaben-tab" style={{ padding: '20px'}}>
			<div className="box col-12">Hello i am Abgabetab </div>
		</div>
		
		);
	}
}


class FeedTab extends Component{
	constructor(props) {
		super(props);
		this.state = {
			groupId: this.props.group._id,
			groupName:this.props.group.name,  
			articles: undefined,
			file: undefined
		}
	}
	
	  componentDidMount() {
		this.handleArticlesUpdate(this.props.group._id)
	  }
	  componentWillReceiveProps(nextProps) {
		if (this.props.group.name !== nextProps.group.name) {
		  this.handleArticlesUpdate(nextProps.group._id)
		}
	  }

	  handleArticlesUpdate = (groupId) => {
		api.getAllArticles(groupId)
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
		  api.createArticle(self.props.group._id,'Group', self.state.groupName, "", self.props.user.email, text, "", Date.now, "")
			.then(res => {
			  self.handleArticlesUpdate(self.props.group._id)
			  document.getElementById("textteilen").value = ""
			});
		} else {
		  self.getBase64(self.state.file, function(base64file) {

			api.createArticle(self.props.group._id,'Group', self.state.groupName, "", self.props.user.email, text, self.state.file.type, Date.now, base64file)
			  .then(res => {
				self.handleArticlesUpdate(self.props.group._id)
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
			
    
			  <div className="tab-pane fade  show active" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
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

class Group extends React.Component {

    constructor(props){
        super(props);
        this.state = {
			user: this.props.user,
            isMember: false,
            group: undefined,
            course: undefined,
            articles: undefined,
            members: [],
            file: null,
        };
    }
    
    componentDidMount(){
		var groupId = this.props.location.pathname.split("/")[2];
		this.handleUpdate(groupId); 
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname!==nextProps.location.pathname){
            var groupId = this.props.location.pathname.split("/")[2];
            this.handleUpdate(groupId);  
        }
    }
	
	
    
    handleUpdate(groupId) {
			//get group
		api.getGroup(groupId)
			.then(res => {
				this.setState({
					group : res
				});
			})
			
			 // check if user is a member   
			.then(() =>
				api.checkEnrolledUser(this.props.user.email, groupId)
				.then(res => {
					console.log(res.success);
					this.setState({
						isMember: res.success
					});
					
				}))
  }
    
    render() {
		
			
        if(!this.state.group /*|| !this.state.articles*/){
            return null;
        }else if(this.state.isMember === false){
           return null;
        }else{
            return (
            <div>
            <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '54px', paddingLeft: '24px'}}>
                <div className="row" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                    <div className="col" style={{paddingRight: '0', paddingLeft: '20px'}}>
                      
                    <h1 style={ { textTransform: 'capitalize' } }>{ this.state.group.name }</h1>
                    </div>
                </div>

                <div className="background-fluid" style={{borderBottom: '1px solid #e8e9eb'}}>
                <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
                 
                  <li className="nav-item">
                      <a className="nav-link tab-title active" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="true">Feed</a>
                  </li>

                  <li className="nav-item">
                      <a className="nav-link tab-title" id="abgaben-tab" data-toggle="tab" href="#abgaben" role="tab" aria-controls="abgaben" aria-selected="false">Abgaben</a>
                  </li>
                </ul>
                </div>
            </div>
                
            <div className="container-fluid row">
                <div className="col-12 col-md-8">
                    <div className="tab-content centered" id="tab-content">
                        <FeedTab  user={this.props.user} group={this.state.group} articles={this.state.articles}/>
						<AbgabenTab user={this.props.user} group={this.state.group} />
                    </div>
                </div>
                <div className="d-none d-md-block col-md-4 order-md-last">
	                <div>
	                  <MemberInfo location={ this.props.location } user={ this.props.user } />
	                </div>
	            </div>
            </div>
        </div>
      );
    }
  }
}


export default Group;
