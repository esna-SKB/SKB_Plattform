import React, { Component } from 'react';
import '../../css/timeline.css';
import api from '../../api';

class CreateChannel extends Component {

  constructor(props) {
    super(props);
    
  }


  anlegen = () => {
    var c_name = document.getElementById('channel_name').value
    var c_description = document.getElementById('channel_description').value

    if (c_name === '' || c_description === '')
      return;

	api.Channel(c_name, c_description).then(res => {
      console.log(res)
      this.props.history.push("/channels");
	  api.enrollUser(this.props.user.email,res.message,'Channel')
    })
	
  }


  render() {

    return (
      <div style={ { backgroundColor: '#f7f8fa' } }>
        <div className="container-fluid row">
          <div className="col col-sm-12" style={ { paddingRight: '0', paddingLeft: '0' } }>
            <div className="tab-content col-offset-6 centered" id="tab-content">
              <div className="tab-pane fade show active" id="ubersicht" role="tabpanel" aria-labelledby="ubersicht-tab" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
                <h3 style={ { borderBottom: '1px solid #efefef', paddingBottom: '15px' } }> Einen neuen Channel erstellen:  </h3>
                <p>Channel-Name : </p>
                <input type="text" name="name" id="channel_name" style={ { borderColor: 'transparent', borderBottomColor: 'black', borderBottomWidth: '1px', width: '100%', marginBottom: '20px' } } />
                <br />
                <p>Beschreibung: </p>
                <textarea rows="4" cols="50" name="description" id="channel_description" style={ { width: '100%' } } />
                <br />

                <a className='whitehover' style={ { color: 'white !important' } }>
                  <button id="anlegen" className='registrieren_botton' onClick={ this.anlegen } style={ { float: 'none', fontSize: '16px', display: 'block', margin: '0 auto' } }>anlegen</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      );

  }
}

export default CreateChannel;
