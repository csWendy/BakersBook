import React, { Component } from 'react';

import Navigation from '../Navigation/Navigation';
import "./Register.css"


class Register extends Component {
	constructor(props) {
			super(props);
			this.state = {
				firstName: "",
				lastName: "",
				username: "",
				email: "",
				password: "",
				verify_password: ""
			}
			this.handleSubmit = this.handleSubmit.bind(this);	
			this.handleUserInput = this.handleUserInput.bind(this);
		}
	
	handleUserInput(event) {
		this.setState({[event.target.name] : event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		
		//BakerBook api endpoint for register
		const url = "https://bakersbook-74fd9.firebaseapp.com/api/v1/register";
		
		if(this.state.password === this.state.verify_password) {
			
		}
		else
		{
			//prompt mismatching password.
		}
	}
	
	render() {
		return (
			<div>
				<Navigation />
				<div className="loginWrapper">
					<form className="registerForm" onSubmit={this.handleSubmit}>
						<h1>Register</h1>
						<div className="eachDiv">
							<label className="allLabels">First Name:</label>
							<input className="allInputs" type="text" name="firstName" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Last Name:</label>
							<input className="allInputs" type="text" name="lastName" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">User Name:</label>
							<input className="allInputs" type="text" name="username" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Email:</label>
							<input className="allInputs" type="text" name="email" onChange={this.handleUserInput} />
						</div >
						<div className="eachDiv">
							<label className="allLabels">Password:</label>
							<input className="allInputs" type="text" name="password" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Verify Password:</label>
							<input className="allInputs" type="text" name="verify_password" onChange={this.handleUserInput} />
						</div>

						<input className="submitButton" type="submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
