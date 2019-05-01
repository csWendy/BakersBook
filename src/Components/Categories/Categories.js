import React, { Component } from 'react';
import 'aos/dist/aos.css';

import "../Categories/Categories.css";

class Categories extends Component {

	handleCategory = (event) => {
		event.preventDefault();
		let Categories = event.target.value;
		this.props.categoryChange(Categories);
		return;

	}
	render() {
		return (
			<div className="categories_section">
				<section className="step2" >
					<input type="button" value="Cake" onClick={this.handleCategory} ></input>
					<input type="button" value="Cookies" onClick={this.handleCategory}></input>
					<input type="button" value="Bread" onClick={this.handleCategory}></input>
				</section>
			</div>

		);
	}
}

export default Categories;
