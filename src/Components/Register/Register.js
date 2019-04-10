import React, { Component } from 'react';
import axios from "axios";
import "./Register.css"
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {getToken} from "../../actions/authAction";

class Register extends Component {
	constructor(props) {
			super(props);
			this.state = {
				firstname: "",
				lastname: "",
				username: "",
				email: "",
				password: "",
				verify_password: "",
				success:false,
				message:""
			}
			this.handleSubmit = this.handleSubmit.bind(this);	
			this.handleUserInput = this.handleUserInput.bind(this);
		}

	

	handleUserInput(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		console.log("Signing Up")
		axios.post("api/v1/register",{
			email:this.state.email,
			password:this.state.password,
			username:this.state.username,
			firstname:this.state.firstname,
			lastname:this.state.lastname
		})
			.then(response=>{
				console.log(response);
				if(response.data.success){
					this.props.getToken(response.data);
					this.setState({
						success:response.data.success,
						accessToken:response.data.accessToken,
						message:response.data.message
					})
				}
				else{
					this.setState(
						{
							success:response.data.success,
							message:response.data.message
						}
					)
				}
			}).catch(function(error){
			console.log("Authorization failed: "+error.message);
		})



	// if(this.state.password === this.state.verify_password) {
		//
		// }
		// else
		// {
		// 	//prompt mismatching password.
		// }
	}

	render() {
		return (
			<div>
				<div className="loginWrapper">
					<form className="registerForm">
						<h1>Register</h1>
						<div className="eachDiv">
							<label className="allLabels">First Name:</label>
							<input className="allInputs" type="text" name="firstname" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Last Name:</label>
							<input className="allInputs" type="text" name="lastname" onChange={this.handleUserInput} />
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
							<input className="allInputs" type="password" name="password" onChange={this.handleUserInput} />
						</div>
						<div className="eachDiv">
							<label className="allLabels">Verify Password:</label>
							<input className="allInputs" type="password" name="verify_password" onChange={this.handleUserInput} />
						</div>

						<NavLink to ="/" className="submitButton" type="submit" onClick={this.handleSubmit.bind(this)} >Submit</NavLink>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accessToken: state.auth.accessToken
	}
}
export default connect(mapStateToProps,{getToken})(Register);
