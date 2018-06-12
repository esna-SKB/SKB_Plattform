import React from 'react';

class Article extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		myEmail: ""
		};
	}



	render(){
		return(
			<div className='row' style={{borderBottom: '1px solid rgb(232, 233, 235)', backgroundColor: 'white', padding: '10px', marginBottom:'20px'}}>
                      <div className='col-12' style={{borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px'}}>
                          <div className='row'>
                            <div className='col-6'>
                              Prof. Rolf Niedermeier
                            </div>
                            <div className='col-6'>
                              <p style={{float:'right'}}>10 min</p>
                            </div>
                          </div>
                      </div>
                      <div className='col-12'>
                          <p style={{color: '#a9a8a8'}}>Liebe Studierende, <br/><br/>

                        die Anzahl der beim Sekretariat gemeldeten Krankheitsfälle und die der Abwesenden beim MCT ist nicht dieselbe.

                        Ich bitte also all diejenigen, die krank waren (und natürlich ihr Attest beim Prüfungsamt abgegeben haben), mich noch zu informieren.</p>
                   </div>
            </div>
			);
	}
}


export default Article;
