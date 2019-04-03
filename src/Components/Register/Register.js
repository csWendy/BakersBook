import React, { Component } from 'react';

import Navigation from '../Navigation/Navigation';
import "./Register.css"


class Register extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<div className="loginWrapper">
					<form className="registerForm">
						<h1>Register</h1>
						<div className="eachDiv">
							<label className="allLabels">First Name:</label>
							<input className="allInputs" type="text" />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Last Name:</label>
							<input className="allInputs" type="text" />
						</div>
						<div className="eachDiv">
							<label className="allLabels">User Name:</label>
							<input className="allInputs" type="text" />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Email:</label>
							<input className="allInputs" type="text" />
						</div >
						<div className="eachDiv">
							<label className="allLabels">Password:</label>
							<input className="allInputs" type="text" />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Verify Password:</label>
							<input className="allInputs" type="text" />
						</div>

						<input className="submitButton" type="submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
