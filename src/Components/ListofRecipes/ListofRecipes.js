import React, { Component } from 'react';

import axios from 'axios';
import { NavLink } from "react-router-dom";

import '../ListofRecipes/ListofRecipes.css';

function searchFor(search) {
	return function (x) {
		return x.name.toLowerCase().includes(search.toLowerCase()) || !search;
	}
}

class Recipes extends Component {
	state = {
		recipes: [],
		search: ""
	};

	componentDidMount() {
		window.scroll(0, 0);

		this.getRecipes();
	}

	handleSearch = (event) => {
		this.setState({
			search: event.target.value
		}, () => {
			console.log(this.state.search);
		})
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
		const { recipes, search } = this.state;
		const Category = this.props.location.state.category;
		return (
			<div className="recipes_list">
				<h1 className='category_Title'>{Category}</h1>
				<span className='search_icon'><i className="fas fa-search"></i></span><input type="text" value={search} placeholder="Search for a Recipe" onChange={this.handleSearch} />

				<div className="listofRecipes">
					{recipes.filter(searchFor(search)).map(aRecipe => {
						if (!recipes.length) {
							return null;
						}
						else {
							if (aRecipe.category === this.props.location.state.category) {
								return (
									<div className='recipe_Box' key={aRecipe.name} >
										<NavLink to={"/viewRecipe/?ref=" + aRecipe.rid}>

											<h2 className='recipe_title'><u>{aRecipe.name}</u></h2>
											<img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
											<h4 className="recipe_ingredients">Ingredients: </h4>
											{aRecipe.ingredient.map((aIngredient, index) => {
												if (!aRecipe.ingredient.length) {
													return null;
												}
												else {
													return (
														<div key={index}>
															<ul>
																<li>{aIngredient.aIngredient}</li>
															</ul>
														</div>
													)
												}
											})}
										</NavLink>
									</div>
								)
							}
						}
					})}
				</div>
			</div>
		);
	}
}

export default Recipes;
