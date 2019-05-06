import React, { Component } from 'react';

import Categories from '../Categories/Categories';

import "../Landing/Landing.css";


class Landing extends Component {
	constructor(props) {
		super(props);
		this.CategorySection = React.createRef();

		this.state = {
			category: ""
		}
	}

	/*handle Categories change*/
	categoryChange = (value) => {
		this.setState({
			category: value
		}, () => {
			console.log('The category is', this.state.category)
			this.props.history.push({
				pathname: '/recipes',
				state: { category: this.state.category }
			});
		})
	}

	handleClick = () => {
		this.CategorySection.current.scrollIntoView({ behavior: 'smooth' });

	}

	render() {
		return (
			<div>
				<div className="landingCover">
					<button onClick={this.handleClick}> Check out our recipes</button>
				</div>

				<div className="categoriesLanding" ref={this.CategorySection}>
					<h3> Try out a new recipe today!</h3>
					<hr />
					<Categories categoryChange={this.categoryChange} />
				</div>
			</div>

		);
	}
}

export default Landing;
