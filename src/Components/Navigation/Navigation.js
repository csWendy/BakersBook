import React from 'react';
import "../Navigation/Navigation.css";

import ToggleButton from './ToggleButton';

const Navigation = props => (
	<header id="header">
		<nav className="toolbar_navigation">
			<div className="nav-toggleBtn">
				<ToggleButton click={props.drawerClickHandler} />
			</div>
			<div className="logo"><h1><a href="/"><i className="fas fa-cookie-bite"></i>Baker's Book </a></h1></div>
			<div className='spacer'></div>
			<div className="nav-items">
				<ul>
					<li><a href="/"> Login </a></li>
					<li><a href="/"> Sign Up </a></li>
				</ul>
			</div>
		</nav>
	</header>
);

export default Navigation;
