import React from 'react';
import { Link, NavLink } from 'react-router-dom'
const api = require('../../api');


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function getCourses(route, cb) {
  return fetch(route)
    .then(status)
    .then((response) => response.json())
    .then((courses) => {
      cb(courses)
    })
    .catch((error) => {
      console.error(error);
    });
}

function CreateCourseButton(props) {
  const isTeacher = props.isTeacher;
  if (isTeacher) {
    return (
      <div className="row">
        <div className='col-12' style={ { borderBottom: '1px solid rgb(232, 233, 235)', paddingTop: '15px', paddingBottom: '15px', marginBottom: '20px' } }>
          <div className='row'>
            <div className='col'>
              <Link to={ `/createcourse` } className='whitehover' style={ { color: 'white !important' } }>
                <div className='registrieren_botton' style={ { marginTop: '-6px', fontSize: '16px', float: 'none', margin: '0 auto', width: '180px' } }>
                  + Kurs anlegen
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      );
  } else {
    return (null);
  }
}

function Element(props) {
  const course = props.course;
  const mini = props.mini;
  if (props.isAdmin) {
    return (
      <div className="w-100 course-name">
        <NavLink to={ '/courses/' + course.name }>
          { course.name }
        </NavLink>
        <button className="btn text-danger btn-link float-right" data-toggle="modal" data-target="#areyousure" >Delete Course</button>
        <div className="btn-group dropleft float-right">
          <button className="btn text-secondary btn-link dropdown-toggle" data-toggle="dropdown">Edit Course</button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Change Name</a>
            <a className="dropdown-item" href="#">Change Teacher</a>
            <a className="dropdown-item" href="#">Change payment</a>
          </div>
        </div>
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
                <p>Are you sure you want to delete this course. This Action cannot be reversed.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger mr-auto"  >I am Sure</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );

  } else if (mini) {
    return (
      <div className="w-100 course-name">
        <NavLink to={ '/courses/' + course.name }>
          { course.name }
        </NavLink>
      </div>
      );

  } else {
    return (
      <div className="box">
        <div className="w-100 course-name">
          <Link to={ `/courses/${course.name}` }>
            { course.name }
          </Link>
          <Link className="float-right" to={ `/user/${course.teacher.email}` }>
            { course.teacher.lastname }
          </Link>
        </div>
      </div>
      );
  }

}

class Suggestions extends React.Component {
  render() {
    const options = this.props.results.map(r => (
      <Element key={ r._id } user={ this.props.user } course={ r } />
    ))
    return <div>
             { options }
           </div>
  }
}

export class SearchCourses extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      location: this.props.location,
      query: '',
      matches: [],
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query.length > 0) {
          this.getInfo()
      }
      else{
        this.setState({
          matches : []
        })
      }
    })
  }

  getInfo = () => {
    if(this.props.user.isTeacher === false){
        const matches = this.props.allCourses.filter(s =>
          s.name.includes(this.state.query) && s.isFree === true
        );
        this.setState({
          matches : matches
        })
    }
    else{
      const matches = this.props.allCourses.filter(s =>
        s.name.includes(this.state.query)
      );
      this.setState({
        matches : matches
      })
    }
  }

  render(){
    return(
      <div className="box col-12">
        <div className="box-title">
          Kurse finden
        </div>
      <div>
        <input id='courseSearch' className="form-control" style={{marginTop:"1em"}} placeholder="Suche nach einem Kurs..." ref={ input => this.search = input } onChange={ this.handleInputChange } list="json-datalist"
        />
        <Suggestions results={ this.state.matches} user={this.props.user} />
      </div>
      </div>
    )
  }
}


export class MyTeacherCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    //get all courses that user is teaching
    if(this.props.allCourses){
      if (this.props.user.isTeacher === true) {
            var coursesForFree = this.props.allCourses.filter((c) => c.teacher.email === this.props.user.email);
            this.setState({
              list: coursesForFree.map((e) => {
                return ( <Element key={ e._id } course={ e } mini={ this.props.mini } />);
              })
            });
      }
    }
    else{
      if (this.props.user.isTeacher === true) {
        getCourses('/course'
          , (courses) => {
            var coursesForFree = courses.filter((c) => c.teacher.email === this.props.user.email);
            this.setState({
              list: coursesForFree.map((e) => {
                return ( <Element key={ e._id } course={ e } mini={ this.props.mini } teacherCourse={true}  />);
              })
            });

          });
      }
    }
  }

  render() {
    if (this.props.user.isTeacher) {
      return (
        <div className="box course-box col-12">
          <div className="box-title">
            Kurse, die ich unterrichte
          </div>
          <div className="courses">
            { this.state.list }
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export class MyCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    if (this.props.myEmail != null) {

      getCourses('/user/' + this.props.myEmail + '/course'
        , (courses) => {
          this.setState({
            list: courses.map((e) => {
              return ( <Element key={ e._id } course={ e } mini={ this.props.mini } />);
            })
          });
        });
    }
  }

  render() {
    const {list} = this.state;
    return (
      <div className="box course-box col-12">
        <div className="box-title">
          Meine Kurse
          <Link to={ `/createcourse/` }>
            { /*<img src={Plus_img} style={{height: '20px', paddingLeft: '8px'}}/>*/ }
          </Link>
        </div>
        <div className="courses">
          { list }
        </div>
      </div>
      );
  }
}
class OtherCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    //Admin can see all courses in Alle Kurse and can delete them
    if (this.props.user.isAdmin === true) {
      getCourses('/course'
        , (courses) => {
          this.setState({
            list: courses.map((e) => {
              return ( <Element key={ e._id } course={ e } isAdmin={true} />);
            })
          });
        });
    }    
    //teacher can see all courses in "Alle Kurse"
    if (this.props.user.isTeacher === true) {

          this.setState({
            list: this.props.allCourses.map((e) => {
              return ( <Element key={ e._id } course={ e } />);
            })
          });
    }
    //student should only see free courses in "Alle Kurse"
    else {
          var coursesForFree = this.props.allCourses.filter((c) => c.isFree === true);
          this.setState({
            list: coursesForFree.map((e) => {
              return ( <Element key={ e._id } course={ e } />);
            })
          });
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div className="box course-box col-12">
        <div className="box-title">
          Alle Kurse
        </div>
        <div className="courses">
          { list }
        </div>
      </div>
      );
  }
}

export class AllCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      allCourses : undefined
    };
  }
  componentDidMount(){
    api.getAllCourses()
    .then(res => {
      this.setState({
        allCourses : res
      })
    })
  }

  render() {
    if(this.state.allCourses){
      return (
        <div>
          <CreateCourseButton isTeacher={ this.props.user.isTeacher } />
          <SearchCourses user={ this.props.user } allCourses = {this.state.allCourses}  />
          <MyTeacherCourses user={ this.props.user } allCourses = {this.state.allCourses} />
          <MyCourses myEmail={ this.props.user.email } />
          <OtherCourses user={ this.props.user } allCourses = {this.state.allCourses}/>
        </div>
        );
    }
    else{
      return false
    }
  }
}
