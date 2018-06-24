import React, { Component } from 'react';
import '../../css/timeline.css';

class CreateCourse extends Component {

  constructor(props){
  super(props);
  this.state = {
    isFree: true
    };
    this.checkboxHandler = this.checkboxHandler.bind(this);
  }

  checkboxHandler(e){
    this.setState({
      isFree: (e.target.value === 'yes')? false : true
    })
  }

  anlegen = () => {
      const { isFree } = this.state;
      const {email} = this.props.user;
      var c_name = document.getElementById('course_name').value
      var c_description = document.getElementById('course_description').value

      if(c_name === '' || c_description === '')
        return;

      var formObject =  { "name":         c_name,
                          "teacher":      email,
                          "description" : c_description,
                          "isFree" :      isFree
                        }

      fetch('/course/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( formObject )
      }).then (res => {
        console.log(res)
        window.location.replace("/courses");
      });
    }


  render() {
    const { isFree } = this.state;

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
                        Nein <input type="radio" name="kostenpflichtig" value="no" defaultChecked={isFree} onChange={ this.checkboxHandler } /><br/>
                        Ja <input type="radio" name="kostenpflichtig" value="yes" onChange={ this.checkboxHandler }/></p>
                      </div>
                    </div>
                      <a className='whitehover' style={{color: 'white !important'}}><button id="anlegen"  className='registrieren_botton' onClick={this.anlegen} style={{float: 'none',fontSize: '16px', display: 'block', margin: '0 auto'}}>anlegen</button></a>

                </div>
              </div>
          </div>


        </div>

        </div>
      );

  }
}

export default CreateCourse;
