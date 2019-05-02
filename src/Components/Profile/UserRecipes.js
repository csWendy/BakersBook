import React, { Component } from 'react';
import axios from 'axios';

import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import "../ListofRecipes/ListofRecipes.css";
import UserInfo from './UserInfo';


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

	render() {
		// const { recipes } = this.state;
		return (
			<div className="listofRecipes">
				{this.state.recipes.map(aRecipe => {
					return (
						< div className='recipe_Box' key={aRecipe.name} >
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
				<UserInfo accessToken={this.props.accessToken} />
			</div>


		);
	};
}


export default UserRecipes;
