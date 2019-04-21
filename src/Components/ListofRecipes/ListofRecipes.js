import React, { Component } from 'react';
import axios from 'axios';

import '../ListofRecipes/ListofRecipes.css';

//todo-searchbar
class Recipes extends Component {
	state = {
		recipes: []
	};

	componentDidMount() {
		window.scroll(0, 0);

		this.getRecipes();
	}


	getRecipes = () => {

		let Category = this.props.location.state.category;
		// console.log('the category is ', this.props.location.state.category)

		axios({
			method: 'get',
			url: '/api/v1/recipe',
		})
			.then(response => {
				this.setState({
					recipes: response.data
				}, () => {
					console.log('The recipes are: ', this.state.recipes)
				})
			})
			.catch(error => { console.log(error) })

	}


	render() {
		const recipes = this.state.recipes;
		const Category = this.props.location.state.category;
		return (
			<div className="listofRecipes">
				<h1>{this.props.location.state.category}</h1>
				{recipes.map((aRecipe, index) => (

					< div key={index} >
						<h3>{aRecipe.name}</h3>
						<img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
						<h4>{aRecipe.category}</h4>
					</div>
				))}

			</div>


		);
	}
}


export default Recipes;
