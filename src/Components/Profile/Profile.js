import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Profile/Profile.css';
import ProfileCard from './ProfileCard';

var userName = 'Wendy Recipe'

class Profile extends Component{
    // constructor(props) {
    //     super(props);
    //     // this.state = {
            
    //     // }
    // }

    render(){
        return (
            <div className="profile">
            <h1>{userName}</h1>
                <ProfileCard accessToken={this.props.accessToken}/> 
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken
    }
}

export default connect(mapStateToProps)(Profile);