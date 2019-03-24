import React from 'react';
import "../Navigation/Navigation.css";

const Navigation = () => (
	<div>
		<header id="header">
			<h1><a href="#"><i class="fas fa-cookie-bite"></i>Baker's Book </a></h1>
			<nav>
				<ul>
					<li><a href="#">Login</a></li>
					<li><a href="#">Sign Up</a></li>
				</ul>
			</nav>
		</header>
	</div >
);

export default Navigation;
