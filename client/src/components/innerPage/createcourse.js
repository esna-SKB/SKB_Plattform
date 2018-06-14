import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../../img/esna.png';
import Bell from'../../img/bell-icon.png';
import Chat from'../../img/chat-icon.png';
import '../../css/timeline.css';

import cookie from 'react-cookies';
import { checkUserSession, updateTimeSec } from '../../utils/userSessionHelper';


class CreateCourse extends Component {

  componentDidMount(){

    var token = cookie.load('userID');
		var email;
		console.log("token tosend fetch: "+ token);
		fetch('userSession/'+ token+ '/email', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  }

		}).then(res => res.json())
			.then(json => {
            //set email in html
            email = json.userId;
            console.log(email)
    });

    function anlegen(){
      var c_name = document.getElementById('course_name').value
      var c_description = document.getElementById('course_description').value
      var radios_kostenpflichtig = document.getElementsByName('kostenpflichtig');
      var kostenpflichtig;
      for (var i = 0, length = radios_kostenpflichtig.length; i < length; i++) {
       if (radios_kostenpflichtig[i].checked) {
        kostenpflichtig = radios_kostenpflichtig[i].value;
        break;
       }
      }

      if(c_name == '' || c_description == '')
        return;

      var formObject =  { "name":         c_name,
                          "teacher":      email,
                          "description" : c_description,
                          "isFree" :      kostenpflichtig
                        }

      fetch('/course/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( formObject )
      }).then (res => {
        console.log(res)
        //window.location.replace("/courses");
      });
    }

    document.getElementById("anlegen").addEventListener("click", anlegen);

  }


  render() {

      return (
        <div style={{backgroundColor: '#f7f8fa'}}>

        <div className="background container-fluid row">

          <div className="col col-sm-12" style={{paddingRight: '0', paddingLeft: '0'}}>

            <div className="tab-content col-offset-6 centered" id="tab-content">

                <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab"
                style={{backgroundColor: 'white', border: '1px solid #efefef', padding: '20px'}}>
                    <h3 style={{borderBottom: '1px solid #efefef', paddingBottom: '15px'}}> Einen neuen Kurs erstellen:  </h3>

                    <p>Course name : </p> <input type="text" name="name" id="course_name"  style={{borderColor: 'transparent', borderBottomColor: 'black', borderBottomWidth: '1px', width: '100%', marginBottom: '20px'}}/><br />
                    <p>Course Description : </p> <textarea rows="4" cols="50" name="description" id="course_description" style={{width: '100%'}}/><br />

                    <div className='row' style={{paddingBottom:'20px'}}>
                    <div className='col-6'>
                        <p> <br/>Kostenpflichtig: <br/><br/>
                        Nein <input type="radio" name="kostenpflichtig" value="no" checked /><br/>
                        Ja <input type="radio" name="kostenpflichtig" value="yes"/></p>
                      </div>
                    </div>
                      <a href="#" className='whitehover' style={{color: 'white !important'}}><button id="anlegen"  className='registrieren_botton' style={{float: 'none',fontSize: '16px', display: 'block', margin: '0 auto'}}>anlegen</button></a>

                </div>

                <div className="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab" style={{ padding: '20px'}}>

                <div className="col-12" id="new_status" style={{marginBottom : '20px'}}>

  <div className="container">
                  <div className="row" style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px'}}>
                      <div className="col-4" style={{textAlign: 'center', borderBottom: '1px solid rgb(0, 127, 178)', marginBottom: '-16px'}}>
                      <span className="glyphicon glyphicon-pencil"></span>
                        Text teilen
                      </div>

                      <div className="col-4" style={{textAlign: 'center'}}>
                        Foto Hochladen
                      </div>

                      <div className="col-4" style={{textAlign: 'center'}}>
                        Datei Hochladen
                      </div>

                  </div>
  </div>


  <div className="col-12" id="post_content">
                  <div className="textarea_wrap"><textarea className="col-xs-11" placeholder="write something..."></textarea></div>
                  </div>

                  <div className="col-xs-12" id="post_footer">
                    <div className="row">
                      <div className="col-12">
                        <button className="btn btn-primary" style={{float: 'right', marginBottom:'10px'}}>Teilen</button>
                      </div>
                      </div>
                  </div>
  </div>

                <div className='container' id="userposts">
                  <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom:'20px'}}>
                        <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                            <div className='row'>
                              <div className='col-6'>
                                Mariano Brey
                              </div>
                              <div className='col-6'>
                                <p style={{float:'right'}}>10 min</p>
                              </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                            mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                            omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                            splendide moderatius, eos ei movet semper elaboraret.</p>
                        </div>
                  </div>

                  <div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px'}}>
                        <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                            <div className='row'>
                              <div className='col-6'>
                                Anton Gulenko
                              </div>
                              <div className='col-6'>
                                <p style={{float:'right'}}>35 min</p>
                              </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <p style={{color: '#a9a8a8'}}>Lorem ipsum dolor sit amet, euismod facilisis vis cu. Pro eu eros incorrupte,
                            mnesarchum argumentum his et. Ne alia solum similique sit, nec an soleat
                            omnium, ad labore eruditi eum. Ius ei aliquid laoreet, ne duo accusamus
                            splendide moderatius, eos ei movet semper elaboraret.</p>
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

export default CreateCourse;
