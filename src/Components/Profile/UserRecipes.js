import React, { Component } from 'react';
import axios from 'axios';

import { NavLink } from "react-router-dom";

import "./ProfileCard.css";

class UserRecipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}

	componentDidMount() {
		this.getRecipes();
	}

	getRecipes = () => {
		console.log('access token', this.props.accessToken)
		axios({
			method: 'get',
			url: '/api/v1/user/recipe',
			headers: { Authorization: `Bearer ${this.props.accessToken}` },

		})
			.then(response => {
				console.log(response)
				this.setState({
					recipes: response.data
				}, () => {
					console.log('The recipes are: ', this.state.recipes)
				})
			})
			.catch(error => { console.log(error) })
	}

	handleDelete = () => {
		console.log('you are in delete function');


	}

	render() {
		// const { recipes } = this.state;
		return (
			<div className="listofRecipes" >
				{this.state.recipes.map(aRecipe => {
					return (
						< div className='recipe_Box' key={aRecipe.name} >
							<button onClick={this.handleDelete(aRecipe.rid)}><i className="fas fa-trash-alt"></i></button>
							<NavLink to={"/viewRecipe/?ref=" + aRecipe.rid}>
								<h2 className='recipe_title'><u>{aRecipe.name}</u></h2>
								<img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
								<h4 className="recipe_ingredients">Ingredients: </h4>
								{aRecipe.ingredient.map((aIngredient, index) => {
									return (
										<div key={index}>
											<ul>
												<li>{aIngredient.aIngredient}</li>
											</ul>
										</div>
									)
								})}
							</NavLink>
						</div>
					)
				})}
			</div>
		);
	};
}


export default UserRecipes;
