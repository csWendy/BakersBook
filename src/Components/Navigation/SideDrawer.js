import React, { Component } from "react";
import { Link } from "react-router-dom";

import './SideDrawer.css';
import {connect} from "react-redux";


class SideDrawer extends Component{

    renderContent(){
        console.log("success in sideDrawer: ",this.props.success)
        switch(this.props.success){
            case true:
                return <ul>
                    <li><Link to="/profile"> Profile </Link> </li>
                    <hr />
                    <li><Link to="/"> Logout </Link> </li>
                </ul>
            default:
                return <ul>
                    <li><Link to="/login"> Login </Link> </li>
                    <hr />
                    <li><Link to="/register"> Register </Link> </li>
                </ul>
        }

    }
    render(){
        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open';
        }
    return (
        <nav className={drawerClasses}>
            {this.renderContent()}
        </nav>
    )};
};

const mapStateToProps = (state) => {
    return {
        success: state.auth.success
    }
}
export default connect(mapStateToProps)(SideDrawer);

