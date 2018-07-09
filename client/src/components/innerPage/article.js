import React from 'react';
import api from '../../api';
// import api from '../../api';
//import axios from 'axios';


class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      changedText: this.props.article.text,
      fileRemoved: false
    };
    this.remove = this.remove.bind(this);
    this.comment = this.comment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delData = this.delData.bind(this);
    this.adminDeleteArticle = this.adminDeleteArticle.bind(this);
    this.adminChangeArticle = this.adminChangeArticle.bind(this);

  }

  remove = (event) => {
    api.deleteArticle(this.props.article._id).then(response => {
      if (response.success === true) {
        document.getElementById(this.props.article._id).outerHTML = "";
      }
    })
  }

  comment = (event) => {
    var div = document.getElementById(this.props.article._id)
    div.firstChild.nextSibling.style["display"] = 'block'

    var input = document.getElementById(this.props.article._id).firstChild.nextSibling.firstChild.firstChild
    input = input.firstChild.firstChild.firstChild
    console.log(input)
    input.onkeypress = function(e) {
      if (!e)
        e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode === '13') {
        console.log(input.value)

        let comment_div = document.createElement('DIV')
        let p = document.createElement('p')
        p.innerHTML = input.value
        let author = document.createElement('p')
        author.style["font-weight"] = 'bold'
        author.style["float"] = 'left'
        author.style["padding-right"] = '20px'
        author.innerHTML = 'me'

        comment_div.appendChild(author)
        comment_div.appendChild(p)

        input.parentElement.parentElement.prepend(comment_div)
        input.value = ''
        return;
      }
    }
  }

  adminArticle(){
    if(this.props.isAdmin){

      return(

        <li><a className="text-danger btn" data-toggle="modal" data-target="#editArticle"> Bearbeiten/ Löschen </a></li>


      )
    }
  }

  onChange (e) {
    
    this.setState({
      changedText: e.target.value
    })
    console.log(this.state.article._id)

  }

  delData (e) {
    this.setState({
      fileRemoved: e.target.checked
    })


  }

  adminDeleteArticle (){
    api.deleteArticle(this.state.article._id);
  }

  adminChangeArticle (){
    api.updateArticle(this.state.article._id, this.state.changedText, this.state.fileRemoved);
  }

  img() {
    if(!this.state.article.data){
      return;
    }
    var base64file = this.state.article.data;
    var name = this.state.article.dataName;

    if (!this.state.article.dataName) {
      name = "undefined";
    }

    var type = this.state.article.type;
    
    if (this.state.article.type === undefined || this.state.article.type === "") {

    } else if (this.state.article.type.includes("image")) {
      return (<img src={ base64file } className="img-rounded img-fluid" alt="" />)
    } else {
      return (

        //<img src={base64file} className="img-rounded img-fluid" alt="Image template"/>
        


        <div>
          <a href={base64file} download={name}> 
            <div className="embed-responsive embed-responsive-16by9">
              <object className="embed-responsive-item" data={base64file} type={type} width="100%" height="400px">
                <embed src={base64file} type={type} width="100%" height="400px" style={{border: "none"}}/>
              </object>
            </div>
          </a>   
        </div>

        /** FOR SAFARI
        <div>
          <a href={base64file} download={name}> 
            <div className="embed-responsive embed-responsive-16by9">
              <object className="embed-responsive-item" data={base64file} type={type} width="100%" height="400px">
                <embed src={base64file} type={type} width="100%" height="400px" style={{border: "none"}}/>
              </object>
            </div>
          </a>   
        </div>
        **/
      )
    }
  }

  render() {
    const article = this.props.article; 
    const isNewsfeed = (this.props.newsfeed)? this.props.newsfeed : false;  
    const isAuthor = (article.author.email === this.props.userEmail); 
    const d = article.created_at.toString();
    var date = new Date(d);

    var timeSince = (date) => {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);
      if (interval > 1)
        return "vor " + interval + " Jahre";

      interval = Math.floor(seconds / 2592000);
      if (interval > 1)
        return "vor " + interval + " Monate";

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        if (interval === 1) return "vor " + interval + " Tag";
        return "vor " + interval + " Tage";
      }

      interval = Math.floor(seconds / 3600);
      if (interval >= 1)
        return "vor " + interval + " Stunden";

      interval = Math.floor(seconds / 60);
      if (interval > 1)
        return "vor " + interval + " Minuten";

      return "vor " + Math.floor(seconds) + " Sekunden";
    }
    return (
        <div id={ this.state.article._id }>
          <div className='row border' style={ { borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px' } }>
            <div className='col-12' style={ { borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px' } }>
              <div className='row'>
                <div className='col-5' style={ { textTransform: 'capitalize' } }>
                  <p>
                    { article.author.firstname }
                    { article.author.lastname }
                  </p>
                  <div>
                    {(isNewsfeed)? article.course.name: "" }
                  </div>
                </div>
                <div className='col-6'>
                  <time style={ { float: 'right' } }>
                    { timeSince(date) }
                  </time>
                </div>
                <div className='col-1'>
                  <button className="dropdown-toggle remove_button_arrow" type="button" data-toggle="dropdown">
                    <h1 className="remove_article">...</h1></button>
                  <ul className="dropdown-menu" style={ { marginTop: '-35px' } }>
                    <li className={(isAuthor)? "remove":"d-none"} onClick={ this.remove.bind(this) }><a className="btn">löschen</a></li>
                    <li className="remove" onClick={ this.comment.bind(this) }><a className="btn">Kommentieren</a></li>
                    {this.adminArticle()}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <h6>{ article.headline }</h6>
              <p style={ { color: '#a9a8a8' } }>
                { article.text }
              </p>
              { this.img() }
            </div>
          </div>
          <div className="comtained border row" style={ { display: 'none' } }>
            <div className="col-sm-12">
              <div className="panel panel-white post">
                <div className="post-comments">
                  <div className="input-group">
                    <input className="form-control comment-input" placeholder="Add a comment..." type="text" />
                    <span className="input-group-addon">
        														<a href="#"><i className="fa fa-check"></i></a>
        												</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

           
          <div className="modal fade" id="editArticle" tabIndex="-1" role="dialog" aria-labelledby="editArticleLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Artikel bearbeiten</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  

                <div className="form-group">
                  <textarea id='ArticleTextAdmin' className="col-xs-11" style={ { width: '100%' } } value={this.state.changedText} onChange = {this.onChange} />
                  <label className="checkbox-inline">
                    Datei löschen? <input type="checkbox" data-toggle="toggle" onChange={this.delData} />
                  </label>
                </div>




                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#areyousure" >Delete Article</button>
                  <button type="button" className="btn btn-success" onClick={this.adminChangeArticle} >Save changes</button>
                

                <div id="areyousure" className="modal fade" tabIndex="-0" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Are you sure?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete this article. This Action cannot be reversed.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger mr-auto"  onClick={this.adminDeleteArticle}>I am Sure</button>
                      </div>
                    </div>
                  </div>
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }

}

export default Article;
