import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserRecipes from './UserRecipes';
import UserInfo from './UserInfo';

import '../Profile/Profile.css';

class Profile extends Component {

	render() {
		return (
			<div className="profile">
				<UserInfo accessToken={this.props.accessToken} />
				<UserRecipes accessToken={this.props.accessToken} />
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		accessToken: state.auth.accessToken
	}
}

export default connect(mapStateToProps)(Profile);
