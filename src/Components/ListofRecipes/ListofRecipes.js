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
		return (
			<div>
				<h1 className='category_Title'>{this.props.location.state.category}</h1>
				<div className="listofRecipes">
					{recipes.map((aRecipe, index) => (

						< div className='recipe_Box' key={index} >
							<h2 className='recipe_title'>{aRecipe.name}</h2>
							<img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
							<h4>{aRecipe.category}</h4>
						</div>
					))}


				</div>
			</div>


		);
	}
}


export default Recipes;
