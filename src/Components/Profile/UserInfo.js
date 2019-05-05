import React, { Component } from 'react';
import axios from 'axios';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			username: ""

		};
	}
	componentDidMount() {
		this.getUserInfo();
	}
	getUserInfo = () => {
		console.log('access token', this.props.accessToken)
		axios({
			method: 'get',
			url: '/api/v1/userinfo',
			headers: { Authorization: `Bearer ${this.props.accessToken}` },

		})
			.then(response => {
				console.log(response)
				this.setState({
					firstname: response.data.firstname,
					lastname: response.data.lastname,
					email: response.data.email,
					username: response.data.username,

				}, () => {
					console.log('The User info is: ', this.state)
				})
			})
			.catch(error => { console.log(error) })
	}



	render() {
		return (
			<div className="User_dashboard">
				<h1 className="profile_banner"> Hello, {this.state.firstname} {this.state.lastname}! </h1>
				<hr />
				<h2 className="recipe_banner"> Here are your recipes.</h2>
				{/* < div className='user_Box'>
					<h4 className='user_fName'>First Name: {this.state.firstname}</h4>
					<h4 className='user_fName'>Last Name: {this.state.lastname}</h4>
					<h4 className='user_fName'>Username: {this.state.username}</h4>
					<h4 className='user_fName'>Email: {this.state.email}</h4>
				</div> */}
			</div>
		);
	}
}

export default UserInfo;
