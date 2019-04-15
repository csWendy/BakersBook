import React, { Component } from "react";
import { Link } from "react-router-dom";

import './SideDrawer.css';
import {connect} from "react-redux";
import {delToken} from "../../actions/authAction";
import axios from "axios";

class SideDrawer extends Component{
    constructor(props){
        super(props);
        this.state = {
            success: false
        }
    }

    componentDidMount() {
        this.setState({
            success: this.props.success
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            success: nextProps.success
        })

    }

    handleClick = () => {

        axios.post('api/v1/signout',{
        })
            .then(response => {
                console.log(response)
                this.setState({
                    success:"false"
                });
                this.props.delToken();

            })


        console.log("success:" , this.props.success);
    }

    renderContent(){
        console.log("success in sideDrawer: ",this.props.success)
        switch(this.props.success){
            case true:
                return <ul>
                    <li><Link to="/profile"> Profile </Link> </li>
                    <hr />
                    <li onClick={this.handleClick}><Link to="/"> Logout </Link> </li>
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
export default connect(mapStateToProps,{delToken})(SideDrawer);

