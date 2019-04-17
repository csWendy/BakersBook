import React from 'react';

import Categories from '../Categories/Categories';

import "../Landing/Landing.css";


const Landing = () => (
	<div>
		<div className="landingCover">
		</div>

		<div className="categoriesLanding">
			<h3> Try out a new recipe today!</h3>
			<hr />

			{/* TODO-handle categories(redirect to recipe list) */}
			<Categories />
		</div>

	</div>
);

export default Landing;
