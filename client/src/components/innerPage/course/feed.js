import React, { Component } from 'react';
import Article from './../article';
import { Link } from 'react-router-dom'
import Chat from '../../../img/chat-icon.png';

import api from '../../../api';


class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.course._id,
      courseName: props.course.name,
      articles: undefined,
      file: undefined,
    }
  }

  componentDidMount() {
    this.handleArticlesUpdate(this.state.courseId)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.course.name !== nextProps.course.name) {
      this.handleArticlesUpdate(nextProps.course._id)
    }
  }


  handleArticlesUpdate = (courseid) => {
    api.getAllArticles(courseid)
      .then(res => {
       return this.setState({
          articles: res.reverse()
        })
      });
  }

  postArticle = () => {

    var text = document.getElementById("textteilen").value;
    var self = this;
    if (!this.state.file) {
      api.createArticle(self.props.course._id, 'Course', self.state.courseName, "", self.props.user.email, text, "", Date.now, "")
        .then(res => {
          self.handleArticlesUpdate(self.props.course._id)
          document.getElementById("textteilen").value = ""
        });
    } else {
      self.getBase64(self.state.file, function(base64file) {
        var name = self.state.file.name;
        api.createArticle(self.props.course._id, 'Course', self.state.courseName, "", self.props.user.email, text, self.state.file.type, Date.now, base64file, self.state.file.name)

          .then(res => {
            self.handleArticlesUpdate(self.props.course._id)
            document.getElementById("textteilen").value = ""
            self.setState({
              file: undefined
            })
          });
      });
    }
  }

  getBase64(file, cb) {
    if (!file) {
      return cb("");
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      //console.log(reader.result);
      cb(reader.result)
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }

  fileUploader = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    const articles = this.state.articles;

    if (!articles) {
      return null;
    } else {
      return (
        <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={ { padding: '20px' } }>
         <PostForm fileUploader={this.fileUploader} postArticle={this.postArticle}
         isTeacher={(this.props.user.email == this.props.course.teacher.email)}/>
          <div>
            { articles.map(function(article) {
                return ( <Article key={ article._id } userEmail={ this.props.user.email } article={ article } isAdmin={ this.props.user.isAdmin } />);
              }, this) }
          </div>
        </div>
      )
    }
  }
}

function PostForm(props){
    if(props.isTeacher){
      return(
       <div className="col-12" id="new_status" style={ { marginBottom: '20px' } }>
            <div className="container">
              <div className="row" style={ { borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px' } }>
                <div className="col-4" style={ { textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px' } }>
                  <span className="glyphicon glyphicon-pencil"></span> Text teilen
                </div>
              </div>
            </div>
            <div className="col-12" id="post_content">
              <div className="textarea_wrap">
                <textarea id='textteilen' className="col-xs-11" style={ { width: '100%' } } placeholder="write something..."></textarea>
                <input type="file" className="file" onChange={ props.fileUploader } />
              </div>
            </div>
            <div className="col-xs-12" id="post_footer">
              <div className="row">
                <div className="col-12">
                  <button id='teilen' className="btn btn-primary" onClick={ props.postArticle } style={ { float: 'right', marginBottom: '10px' } }>
                    Teilen
                  </button>
                </div>
              </div>
            </div>
          </div>
      )
    }else{
      return null
    }
  }

export default Feed; 