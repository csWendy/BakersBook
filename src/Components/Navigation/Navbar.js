import React from 'react';
import { Link } from "react-router-dom";

import ToggleButton from './ToggleButton';

import "../Navigation/Navbar.css";


const Navbar = props => (
	<header id="header">
		<nav className="toolbar_navigation">
			<div className="nav-toggleBtn">
				<ToggleButton click={props.drawerClickHandler} />
			</div>
			<div className="logo"><h1><Link to='/'> <i className="fas fa-cookie-bite"></i>Baker's Book</Link> </h1></div>
			<div className='spacer'></div>
			<div className="nav-items">
				<ul>
					<li><Link to="/"> Login </Link> </li>
					<li><Link to="/register"> Register </Link> </li>
				</ul>
			</div>
		</nav>
	</header>
);

export default Navbar;
