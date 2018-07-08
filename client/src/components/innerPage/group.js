import React, { Component } from 'react';
import Article from './article';
import { Link } from 'react-router-dom'
import api from '../../api';
import dragula from 'dragula';

class FeedTab extends Component{
    ComponentDidMount(props){
	  //super(props);
      this.setState({
		groupId: this.props.group._id,
		groupName:this.props.group.name,  
		articles: undefined,
		file: undefined
      })
    }
	  componentDidMount() {
		this.handleArticlesUpdate(this.props.group.name)
	  }
	  componentWillReceiveProps(nextProps) {
		if (this.props.group.name !== nextProps.group.name) {
		  this.handleArticlesUpdate(nextProps.group.name)
		}
	  }

	  handleArticlesUpdate = (groupId) => {
		api.getAllArticlesOfGroup(groupId)
		  .then(res => {
			this.setState({
			  articles: res.reverse()
			})
		  });
	  }

    postArticle = () =>{
			var text = document.getElementById("textteilen").value;
			var self = this;
			if (!this.state.file) {
			  api.createGroupArticle(self.props.group._id, "", self.props.user.email, text, "", Date.now, "")
				.then(res => {
				  self.handleArticlesUpdate(self.props.group._id)
				  document.getElementById("textteilen").value = ""
				});
			} else {
			  self.getBase64(self.state.file, function(base64file) {

				api.createArticle(self.props.group._id, "", self.props.user.email, text, self.state.file.type, Date.now, base64file)
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
        return(
          <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>
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
            
            </div>
          </div>
        );
  }
}

class Group extends React.Component {

    constructor(props){
        super(props);
        this.state = {
			user: this.props.user,
            isMember: true,
            group: undefined,
            course: undefined,
            articles: undefined,
            members: [],
            file: null,
        };
    }
    
    componentDidMount(){
	console.log(this.props.location.pathname);
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
        
    .then(() => {// check if user is a member
		var i;
		for (i = 0; i < this.state.group.members.length ; i++){
			if(this.state.group.members[i] === this.state.user._id){
				this.setState({
					isMember: true,
				})
			}
		}
	})
    /*
    .then(()=>{
        //get all feed articles
          api.getAllArticlesOfGroup(groupId).then(res => {
            this.setState({articles : res.reverse()})
          });
          api.getAllMembersOfGroup(groupId).then(res=>{
              this.setState({members: res.reverse()})
          })
    })*/
  }
    
    render() {
        if(!this.state.group /*|| !this.state.articles*/){
            return false;
        }else if(this.state.isMember === false){
            <div> You are not a member of the group </div>
        }else{
            return (
            <div>
            <div className="container-fluid" style={{marginBottom: '20px',paddingRight: '54px', paddingLeft: '24px'}}>
                <div className="row" style={{backgroundColor: 'white', border: '1px solid #e8e9eb', paddingTop: '12px', paddingBottom: '12px'}}>
                    <div style={{paddingRight: '0', paddingLeft: '20px'}}>
                        <h3>{this.state.group.name}</h3>
                    </div>
                </div>

                <div className="background-fluid" style={{borderBottom: '1px solid #e8e9eb'}}>
                <ul className="nav nav-tabs justify-content-center col-offset-6 centered" id="mytabs" role="tablist">
                  <li className = "nav-item">
                      <a className="nav-link tab-title active" id="lehrer-tab" data-toggle="tab" href="#ubersicht" role="tab" aria-controls="ubersicht" aria-selected="true">Übersicht</a>
                  </li>

                  <li className="nav-item">
                      <a className="nav-link tab-title" id="kurse-tab" data-toggle="tab" href="#feed" role="tab" aria-controls="feed" aria-selected="false">Feed</a>
                  </li>

                  <li className="nav-item">
                      <a className="nav-link tab-title" id="abgaben-tab" data-toggle="tab" href="#abgaben" role="tab" aria-controls="agbaben" aria-selected="false">Abgaben</a>
                  </li>
                </ul>
                </div>
            </div>
                
            <div className="background container-fluid row">
                <div className="col col-sm-12">
                    <div className="tab-content col-offset-6 centered" id="tab-content">

                        <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                        <div className="row">
                            <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Inhalt </h3>
                        </div>

                        <div style={{display : 'none'}} id="wrapper" ref="wrapper">
                          <div className="wrapper">
                          	<div className="box-left">
                            <div data-tpl="header1" data-title="Header 1">
                              Header 1
                            </div>
                          		<div data-tpl="header2" data-title="Header 2">
                          			Header 2
                          		</div>
                          		<div data-tpl="header3" data-title="Header 3">
                          			Header 3
                          		</div>
                          		<div data-tpl="shortparagraph" data-title="Short paragraph">
                          			paragraph
                          		</div>
                          		<div data-tpl="ullist" data-title="Ordened list">
                          			Ordened list
                          		</div>
                          		<div data-tpl="ollist" data-title="Unordened list">
                          			Unordened list
                          		</div>
                              <div data-tpl="heade12" data-title="Unordened list">
                                Datei
                              </div>
                              <div data-tpl="header12" data-title="Unordened list">
                                Picture
                              </div>
                          	</div>
                          	<div id="boxright" ref="boxright" className="box-right"></div>
                          </div>
                          </div>

                            <p id="description" ref="description"></p>
                            <div id="kursmaterial" ref="kursmaterial">
                            <h3> nächste Abgaben </h3>
                            <h3> 16. April - abgabe01.pdf </h3>
                            <p>23.April - noch nichts abgegeben!</p>
                            <p>30.April</p>
                        </div>
                        </div>
                        <FeedTab  user={this.props.user} group={this.state.group} articles={this.state.articles}/>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
}


export default Group;
