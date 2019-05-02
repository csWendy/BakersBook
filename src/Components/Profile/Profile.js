import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Profile/Profile.css';
import UserRecipes from './UserRecipes';
var userName = 'Wendy Recipe'

class Profile extends Component {

	render() {
		return (
			<div className="profile">
				<h1>{userName}</h1>
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
