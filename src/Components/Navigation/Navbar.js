import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

import ToggleButton from './ToggleButton';

import "../Navigation/Navbar.css";

class Navbar extends Component{
	constructor(props){
		super(props);
	}

	handleClick = () => {
		axios.post('api/v1/signout',{
		})
	}

	renderContent(){
		console.log("success in header: ",this.props.success)
		switch(this.props.success){
			case true:
				return <ul>
					<li><Link to="/Profile"> Profile </Link></li>
					<li onClick={this.handleClick}><Link to="/"> Logout </Link></li>
				</ul>
			default:
				return <ul>
					<li><Link to="/login"> Login </Link></li>
					<li><Link to="/register"> Register </Link></li>
				</ul>
		}

	}

	render() {
		return(
			<div>
				<header id="header">
					<nav className="toolbar_navigation">
						<div className="nav-toggleBtn">
							<ToggleButton click={this.props.drawerClickHandler}/>
						</div>
						<div className="logo"><h1><Link to='/'> <i className="fas fa-cookie-bite"></i>Baker's Book</Link></h1>
						</div>
						<div className='spacer'></div>
						<div className="nav-items">
							{this.renderContent()}
						</div>
					</nav>
				</header>
			</div>
		)}
	};

const mapStateToProps = (state) => {
	return {
		success: state.auth.success
	}
}
export default connect(mapStateToProps)(Navbar);
