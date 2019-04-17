import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ToggleButton from './ToggleButton';
import { delToken } from "../../actions/authAction";

import "../Navigation/Navbar.css";

class Navbar extends Component {
	constructor(props) {
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

		axios.post('api/v1/signout', {
		})
			.then(response => {
				console.log(response)
				this.setState({
					success: "false"
				});
				this.props.delToken();

			})


		console.log("success:", this.props.success);
	}

	renderContent() {

		console.log("success in Navbar (props): ", this.props.success)
		console.log("success in Navbar (state): ", this.state.success)
		switch (this.state.success) {
			case false:
				return <ul>
					<li><Link to="/login"> Login </Link></li>
					<li><Link to="/register"> Register </Link></li>
				</ul>
			case true:
				return <ul>
					<li><Link to="/Profile">Profile</Link></li>
					<li><Link to="/recipeform">Recipe Form</Link></li>
					<li onClick={this.handleClick}><Link to="/"><i className="fas fa-sign-out-alt"></i></Link></li>
				</ul>
		}
	}
	render() {
		return (
			<div>
				<header id="header">
					<nav className="toolbar_navigation">
						<div className="nav-toggleBtn">
							<ToggleButton click={this.props.drawerClickHandler} />
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
		)
	}
};

const mapStateToProps = (state) => {
	return {
		success: state.auth.success
	}
}
export default connect(mapStateToProps, { delToken })(Navbar);
