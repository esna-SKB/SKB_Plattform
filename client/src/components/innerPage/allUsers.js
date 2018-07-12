import React from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';


class AllUsers extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      users: undefined,
	    }
	    this.render = this.render.bind(this);
	}

	componentDidMount() {
		api.getAllUsers().then((data) => {
	        data = data.map(user => user);
	        this.setState({
	          users: data
	        })
	      })
	}

	adminDeleteUser(){

	}



	render(){
		const users = this.state.users;
		console.log('USERS: ' + users);



		if (this.props.user.isAdmin && users){
			console.log('DRINNE: ' + users);
			return(
				<div>
				<div id="members" style={ { backgroundColor: 'white', border: '1px solid #efefef', padding: '20px' } }>
		            <table className="table table-hover">
			            <tbody>
			              { users.map((user, i) => {
			              		var firstname = user.firstname;
			              		var lastname = user.lastname;
			              		function changeFirst(e){
			              			var users = this.state.users;
			              			users[i].firstname = e.target.value; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeFirst = changeFirst.bind(this)
			              		function changeLast(e){
			              			var users = this.state.users;
			              			users[i].lastname = e.target.value; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeLast = changeLast.bind(this)

			              		function changeEmail(e){
			              			var users = this.state.users;
			              			users[i].email = e.target.value; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeEmail = changeEmail.bind(this)

			              		function changeTeacher(e){
			              			var users = this.state.users;
			              			users[i].isTeacher = e.target.checked; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeTeacher = changeTeacher.bind(this)

			              		function changeAdmin(e){
			              			var users = this.state.users;
			              			users[i].isAdmin = e.target.checked; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeAdmin = changeAdmin.bind(this)

			              		function changeVerified(e){
			              			var users = this.state.users;
			              			users[i].isVerified = e.target.checked; 
			              			this.setState({
			              				users: users,
			              			});
			              		}
			              		changeVerified = changeVerified.bind(this)

			              		function deleteUser(e){
			              			api.getAllCoursesOfUser(this.state.users[i].email).then(res => {
			              				res.map((course) => {
			              					api.unenrollUser(this.state.users[i].email, course.name)
			              				})
			              			})
			              			api.deleteUser(this.state.users[i].email);
			              			window.location.reload();
			              		}
			              		deleteUser = deleteUser.bind(this)

			              		function updateUser(e){
			              			api.updateUser(this.state.users[i].email, this.state.users[i]);
			              			window.location.reload();
			              		}
			              		updateUser = updateUser.bind(this)

			              		return(
			                  	
				                  	<tr className='clearfix' style={ { textTransform: 'capitalize' } } key={ i }>
			                           <td>
			                           		<Link to={ `/user/${user.email}` }>
				                             	{ user.firstname + ' '}
				                             	{ user.lastname }
			                           		</Link>
				                           <button className="btn btn-danger btn-sm float-right " data-toggle="modal" data-target={"#delete"+user._id}> Delete User </button>
				                           <button className="btn btn-secondary btn-sm float-right" data-toggle="modal" data-target={"#edit"+user._id} > Edit User </button>

				                           <div className="modal fade" id={"edit"+user._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
											    <div className="modal-content">
											      <div className="modal-header">
											        <h5 className="modal-title" id="exampleModalLabel">{"Edit " + user.firstname + " " + user.lastname }</h5>
											        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
											          <span aria-hidden="true">&times;</span>
											        </button>
											      </div>
											      <div className="modal-body">
											        
											      	<div className="form-group row">
												      	<label htmlFor="firstname" className="col-md-2">First name</label>
												        <input className="form-control col-md-10" id="firstname" value={this.state.users[i].firstname} onChange={changeFirst}/>
											        </div>

											        <div className="form-group row">
												        <label htmlFor="lastname" className="col-md-2">Last name</label>
												        <input className="form-control col-md-10" id="lastname" value={this.state.users[i].lastname} onChange={changeLast}/>
											        </div>

											        <div className="form-group row">
											        	<label htmlFor="email" className="col-md-2">E-Mail</label>
											        	<input className="form-control col-md-10" id="email" value={this.state.users[i].email} onChange={changeEmail}/>
											        </div>

											        <div className="form-group row">
											        	<legend className="col-form-label col-sm-2 pt-0">Rights:</legend>

											        	<div className="col-sm-10">
													        <div className="form-check">
											        			<input type="checkbox" className="form-check-input" id="teacher" checked={this.state.users[i].isTeacher} onChange={changeTeacher}/>
														        <label htmlFor="teacher" className="form-check-label">Teacher?</label>

													        </div>

													        <div className="form-check">
											        			<input type="checkbox" className="form-check-input" id="admin" checked={this.state.users[i].isAdmin} onChange={changeAdmin}/>
		   											        	<label htmlFor="admin" className="form-check-label">Admin?</label>
													        </div>

													        <div className="form-check">
											        			<input type="checkbox" className="form-check-input" id="verified" checked={this.state.users[i].isVerified} onChange={changeVerified}/>
		   											        	<label htmlFor="verified" className="form-check-label">Verified?</label>
													        </div>
													    </div>
											        </div>

											      </div>
											      <div className="modal-footer">
											        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
											        <button type="button" className="btn btn-success" onClick={updateUser}>Save changes</button>
											      </div>
											    </div>
											  </div>
											</div>
											<div id={"delete"+user._id} className="modal fade" tabIndex="-0" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
							                  <div className="modal-dialog modal-dialog-centered modal-sm">
							                    <div className="modal-content">
							                      <div className="modal-header">
							                        <h5 className="modal-title">Are you sure?</h5>
							                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
							                          <span aria-hidden="true">&times;</span>
							                        </button>
							                      </div>
							                      <div className="modal-body">
							                        <p>Are you sure you want to delete <span className="text-danger">{user.firstname} {user.lastname}</span>. This Action cannot be reversed.</p>
							                      </div>
							                      <div className="modal-footer">
							                        <button type="button" className="btn btn-danger mr-auto"  onClick={deleteUser}>I am Sure</button>
							                      </div>
							                    </div>
							                  </div>
							                </div>		                          
			                           </td>
			                        </tr>

			                    )
			                }) }
			            </tbody>
		            </table>
		          </div>
		          </div>

			)
		} else {
			return null;
		}	
	}
}

export default AllUsers