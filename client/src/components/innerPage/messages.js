import React from 'react';
// import '../../css/messages.css';

class Threads extends React.Component {
	constructor(props){
	super(props);
	}



	render(){
		return(
			<div></div>
			);
	}
}

export class Messages extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		user: this.props.user
		};
	}


	render(){
		return(
			<div className="container" style={{backgroundColor : 'white'}}>
                <div className="row" style={{'border': '1px solid #dee2e6'}}>
                    <div className="col-6" style={{'borderRight': '1px solid #dee2e6'}}>
                        <div className="col-content">
                            <div className="messages nav nav-tabs" >
								<ul className="nav nav-tabs" style={{listStyleType: 'none'}}>
                                    <li role="message" className="active" style={{'borderBottom': '1px solid #dee2e6'}}>
										<a href="#tab_default_1" data-toggle="tab">
                                            <div className="avatar">
                                                <div className="avatar-image">
                                                    <div className="status online"></div>
                                                    <img src=""/>
                                                </div>
                                            </div>
                                            <h3>Nancy Scott</h3>
										</a>
                                    </li>
                                    <li role="message" style={{'borderBottom': '1px solid #dee2e6'}}>
										<a href="#tab_default_2" data-toggle="tab">
                                            <div className="avatar">
                                                <div className="avatar-image">
                                                    <div className="status offline"></div>
                                                    <img src=""/>
                                                </div>
                                            </div>
                                            <h3>Cynthia Castro</h3>
										</a>
                                    </li>
                                    <li role="message" style={{'borderBottom': '1px solid #dee2e6'}}>
										<a href="#tab_default_3" data-toggle="tab">
                                            <div className="avatar">
                                                <div className="avatar-image">
                                                    <div className="status online"></div>
                                                    <img src=""/>
                                                </div>
                                            </div>
                                            <h3>Ethan Gitson</h3>
										</a>
                                    </li>
                                    <li role="message">
                						<a href="#tab_default_2" data-toggle="tab">
                                            <div className="avatar">
                                                <div className="avatar-image">
                                                    <div className="status online"></div>
                                                    <img src=""/>
                                                </div>
                                            </div>
                                            <h3>Philip Nelson</h3>
                						</a>
                                    </li>
								</ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col-content tab-content">
                            <div className="tab-pane active" id="tab_default_1" style={{height:'550px'}}>
                                <div className="grid-message">
                                    <div className="col-message-sent">
                                        <div className="message-sent">
                                            <p>Not anymore.</p>
                                        </div>
                                    </div>
                                    <div className="col-message-received">
                                        <div className="message-received">
                                            <p>But, can you?</p>
                                        </div>
                                    </div>
                                    <div className="col-message-sent">
                                        <div className="message-sent">
                                            <p>I guess if I had some practice I could again. Its been years.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

            				<div className="tab-pane" id="tab_default_2" style={{height:'550px'}}>
                                <div className="grid-message">
                                    <div className="col-message-sent">
                                        <div className="message-sent">
                                            <p>Naaaaaah.</p>
                                        </div>
                                    </div>
                                    <div className="col-message-received">
                                        <div className="message-received">
                                            <p>yaaaaah</p>
                                        </div>
                                    </div>
            												<div className="col-message-received">
                                        <div className="message-received">
                                            <p>yaaaaah</p>
                                        </div>
                                    </div>
            												<div className="col-message-received">
                                        <div className="message-received">
                                            <p>yaaaaah</p>
                                        </div>
                                    </div>
                                    <div className="col-message-sent">
                                        <div className="message-sent">
                                            <p>I guess if I had some practice I could again. Its been years.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

							<div className="tab-pane" id="tab_default_3" style={{height:'550px'}}>
								<div className="grid-message">
									<div className="col-message-sent">
										<div className="message-sent">
											<p>this is tab 3.</p>
										</div>
									</div>
									<div className="col-message-received">
										<div className="message-received">
											<p>really</p>
										</div>
									</div>
									<div className="col-message-received">
										<div className="message-received">
											<p>yeaaah</p>
										</div>
									</div>
									<div className="col-message-received">
										<div className="message-received">
											<p>its tab 3</p>
										</div>
									</div>
									<div className="col-message-sent">
										<div className="message-sent">
											<p>I guess if I had some practice I could again. Its been years.</p>
										</div>
									</div>
								</div>
                            </div>
                        </div>
                        <div className="col-foot">
                            <div className="compose">
                                <input placeholder="Type a message"/>
                                <div className="compose-dock">
                                    <div className="dock"><img src=""/><img src=""/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}
