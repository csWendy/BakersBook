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
	handleMoveLeft = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

	}
	handleMoveRight = () => {
		window.scroll({
			top: 0,
			left: 10000,
			behavior: 'smooth'
		});
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
				<div className="recipe_banner">
					<button onClick={this.handleMoveLeft} className="btn-left"><i class="fas fa-chevron-left"></i></button>
					Here are your recipes.
					<button onClick={this.handleMoveRight} className="btn-right"><i class="fas fa-chevron-right"></i></button>
				</div>
			</div>
		);
	}
}

export default UserInfo;
