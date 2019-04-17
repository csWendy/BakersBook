import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getToken } from "../../actions/authAction";

import "./Login.css"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            success: false,
            accessToken: "",
            message: ""
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        console.log("Logging In")
        axios.post("api/v1/signin", {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    this.props.getToken(response.data);
                    this.setState({
                        success: response.data.success,
                        accessToken: response.data.accessToken,
                        message: response.data.message
                    })
                    this.props.history.push({
                        pathname: '/recipeform',
                    });
                }
                else {
                    this.setState(
                        {
                            success: response.data.success,
                            message: response.data.message
                        }
                    )
                }
            }).catch(function (error) {
                console.log("Authorization failed: " + error.message);
            })
    }

    render() {
        return (
            <div>
                <div className="Wrapper">
                    <form className="loginForm">
                        <h1>Login</h1>
                        <div className="eachDiv">
                            <label className="labelWrapper">Email:</label>
                            <input required={true} className="inputsWrapper" type="text" name="email" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="eachDiv">
                            <label className="labelWrapper">Password:</label>
                            <input required={true} className="inputsWrapper" type="password" name="password" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div>
                            <input className="messageBox" id="message" disabled={true} readOnly={true} value={this.state.message} size="30" />
                        </div>

                        <input className="submitButton" type="submit" onClick={this.handleSubmit.bind(this)} />
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
export default connect(mapStateToProps, { getToken })(Login);
