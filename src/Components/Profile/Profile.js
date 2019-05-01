import React, { Component } from 'react';

import '../Profile/Profile.css';
import ProfileCard from './ProfileCard';

var userName = 'Wendy Recipe'

class Profile extends Component{

    render(){
        return (
            <div className="profile">
            <h1>{userName}</h1>
            <ProfileCard/> 
            </div>
        );
    }
}

export default Profile;