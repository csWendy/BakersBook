//Component will handle responsive Navigation Bar( toggle sideDrawer) on all views.

import React, { Component } from 'react';

import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import Backdrop from './backdrop/Backdrop';

import '../../Index.css';

class Navigation extends Component {
	state = {
		sideDrawerOpen: false
	}
	drawerToggleClickHandler = () => {
		this.setState((prevState) => {
			return { sideDrawerOpen: !prevState.sideDrawerOpen }
		});

	};

	backdropClickHandler = () => {
		this.setState({ sideDrawerOpen: false });
	};

	render() {
		let backdrop;

		if (this.state.sideDrawerOpen) {
			backdrop = <Backdrop click={this.backdropClickHandler} />;
		}
		return (
			<div style={{ height: '100%' }}>
				<Navbar drawerClickHandler={this.drawerToggleClickHandler} />
				<SideDrawer show={this.state.sideDrawerOpen} />
				{backdrop}
			</div>
		);
	}
}

export default Navigation;
