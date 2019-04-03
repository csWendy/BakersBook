import React, { Component } from 'react';

import "./Register.css"


class Register extends Component {
    render() {
        return (

            <div className="loginWrapper">


                    <form className="registerForm">
                        <h1>Register</h1>
                        <div className="eachDiv">
                            <label className="allLabel">First Name:</label>
                            <input className="allInputs" type="text"/>
                        </div>
                        <div className="eachDiv">
                            <label className="allLabel">Last Name:</label>
                            <input className="allInputs" type="text"/>
                        </div>
                        <div className="eachDiv">
                            <label className="allLabel">User Name:</label>
                            <input className="allInputs" type="text"/>
                        </div>
                        <div className="eachDiv">
                            <label className="allLabel">Email:</label>
                            <input className="allInputs" type="text"/>
                        </div >
                        <div className="eachDiv">
                            <label className="allLabel">Password:</label>
                            <input className="allInputs" type="text"/>
                        </div>
                        <div className="eachDiv">
                            <label className="allLabel">Verify Password:</label>
                            <input className="allInputs" type="text"/>
                        </div>

                        <input className="submitButton" type="submit" />
                     </form>


            </div>
        );
    }
}

export default Register;
