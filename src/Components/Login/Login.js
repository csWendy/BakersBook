import React, { Component } from 'react';

import "./Login.css"
import Navigation from "../Navigation/Navigation";


class Login extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className="Wrapper">
                    <form className="loginForm">
                        <h1>Login</h1>
                        <div className="eachDiv">
                            <label className="labelWrapper">Email:</label>
                            <input required={true} className="inputsWrapper" type="text"/>
                        </div>
                        <div className="eachDiv">
                            <label className="labelWrapper">Password:</label>
                            <input required={true} className="inputsWrapper" type="text"/>
                        </div>

                        <input className="submitButton" type="submit" />
                    </form>


                </div>
            </div>
        );
    }
}

export default Login;
