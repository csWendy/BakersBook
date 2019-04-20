import React, { Component } from 'react';

import Categories from '../Categories/Categories';

import "../Landing/Landing.css";


class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: ""
		}
	}

	/*handle Categories*/
	categoryChange = (value) => {
		this.setState({
			category: value
		}, () => {
			console.log('The category is', this.state.category)
		})
	}
	render() {
		return (
			<div>
				<div className="landingCover">
				</div>
				<div className="categoriesLanding">
					<h3> Try out a new recipe today!</h3>
					<hr />

					{/* TODO-handle categories(redirect to recipe list) */}
					<Categories categoryChange={this.categoryChange} />
				</div>
			</div>

		);
	}
}

export default Landing;
