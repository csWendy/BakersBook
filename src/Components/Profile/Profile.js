import React, { Component } from 'react';

import '../Profile/Profile.css';
import Card from '../Profile/Card';

class Profile extends Component{

    render(){
        return (
            <div className="profile">
            <h1>Wendy's Receipe </h1>
            <Card/> 
            </div>
        );
    }
}

export default Profile;