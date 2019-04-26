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
					{recipes.map(aRecipe => {
						if (aRecipe.category === this.props.location.state.category) {
							return (
								< div className='recipe_Box' key={aRecipe.name} >
									<h2 className='recipe_title'>{aRecipe.name}</h2>
									<img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
									<h4>Ingredients: </h4>
									{aRecipe.ingredient.map((aIngredient, index) => {
										return (
											<div key={index}>
												<ul>
													<li>{aIngredient.aIngredient}</li>
												</ul>
											</div>
										)
									})}
								</div>
							)
						}

					})}
				</div>
			</div>


		);
	}
}


export default Recipes;
