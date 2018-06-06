import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from'../img/esna.png';
import Bell from'../img/bell-icon.png';
import Chat from'../img/chat-icon.png';
import Italy from'../img/flags/italy.png';
import '../css/course.css';


class Course extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/"><img id="logo" className="logo" src={Logo} alt="Logo"/></a>
          </div>

          <form className="navbar-form navbar-center" action="/search">
            <div className="input-group">
              <div className="input-group-btn">
                <button className="searchbutton btn" type="submit"></button>
              </div>
              <input type="text" className="searchbar form-control" placeholder="Search" name="srch-term" id="srch-term"/>
            </div>
          </form>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><img id="chat" className="icon" src={Chat} alt="Chat"/></a></li>
            <li><a href="#"><img id="notifications" className="icon" src={Bell} alt="Bell"/></a></li>
          </ul>

        </div>
      </nav>
        

      <div className="container-fluid">
      <div className="background row">
        
        <div className="course-title-box text-center col-12">
        
          <img id="italy" className="flag" src={Italy} alt="Italy"/> &emsp;
          <div className="course-title">Italienisch A1.1 </div>
        
        </div>
        
      </div>
        
        
      <div className="background row">

        <div className="col col-sm-3 background">
          <div className="row">
            <div className="box col-12">
              <div className="teacher-title">Lehrer/-in</div>
              <div className="teacher">Emilia Blabla</div>
              <a href="#" className="contact">Kontaktieren</a>
            </div>
          </div>
          <div className="row">
            <div className="box col-12 text-center">
              9. Mai 2018 <br /> - <br /> 25. Juli 2018
            </div>
          </div>
          <div className="row">
            <div className="box col-12 text-center">
              Mittwoch <br /> 18:00 - 21:00
            </div>
          </div>

        </div>

        <div className="col col-sm-6 background">
        
          <div className="row">
            <ul class="nav nav-tabs justify-content-center col-12 centered" id="mytabs" role="tablist">
              <li class="nav-item">
                <a className="tab-title nav-link active" id="übersicht-tab" data-toggle="tab" href="#übersicht" role="tab" aria-controls="übersicht" aria-selected="true">Übersicht</a>
              </li>

            
              <li class="nav-item">
                <a className="tab-title nav-link" id="ankündigungen-tab" data-toggle="tab" href="#ankündigungen" role="tab" aria-controls="ankündigungen" aria-selected="false">Ankündigungen</a>
              </li>
            
            
              <li class="nav-item">
                <a className="tab-title nav-link" id="gruppen-tab" data-toggle="tab" href="#gruppen" role="tab" aria-controls="gruppen" aria-selected="false">Gruppen</a>
              </li>
            

              <li class="nav-item">
                <a className="tab-title nav-link" id="dokumente-tab" data-toggle="tab" href="#dokumente" role="tab" aria-controls="dokumente" aria-selected="false">Dokumente</a>
              </li>
            </ul>
          </div>
        
         <div className="row">
            <div className="box tab-content col-12 centered" id="tab-content">

              <div class="tab-pane fade show active" id="übersicht" role="tabpanel" aria-labelledby="übersicht-tab">
                  <h3> Übersicht </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>

              </div>

              <div class="tab-pane fade" id="ankündigungen" role="tabpanel" aria-labelledby="ankündigungen-tab">
                  <h3> Ankündigungen </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
              
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>

              </div>

        
              <div class="tab-pane fade" id="gruppen" role="tabpanel" aria-labelledby="gruppen-tab">
                  <h3> Gruppen </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>

              </div>

          
              <div class="tab-pane fade" id="dokumente" role="tabpanel" aria-labelledby="dokumente-tab">
                  <h3> Dokumente </h3>

                  <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, facere aliquam accusantium, explicabo natus harum incidunt omnis, nemo quidem blanditiis voluptatibus placeat! Iure nulla obcaecati necessitatibus neque recusandae excepturi aliquid.
                  </p>
              </div>

          </div>
        </div>
        </div>

        <div className="col col-sm-3">
          <div className="row">
            <div className="box col-12">
              <div className="participants-title">Teilnehmer</div>


            </div>
          </div>
        </div>

      </div>

      </div>
        
      </div>
    );
  }
}

export default Course;
