import React from 'react';

import Header from './innerPage/header';
import Body from './innerPage/body';



class InnerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <div className="background_illustration" style={ { backgroundColor: 'rgba(238, 239, 243, 0.79)' } }>
        <Header user={ this.props.user } handleLogout={ this.props.handleLogout } />
        <Body updateUser={ this.props.updateUser } user={ this.props.user } />
      </div>
      );
  }
}

export default InnerPage;
