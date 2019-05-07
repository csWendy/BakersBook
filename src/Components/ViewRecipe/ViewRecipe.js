import React, { Component } from 'react';
import axios from "axios";

import "./ViewRecipe.css"

import queryString from "query-string";

class ViewRecipe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			author: "",
			name: "",
			imageUrl: "",
			category: "",
			ingredients: [],
			recipe: []
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		const rid = queryString.parse(this.props.location.search)
		console.log("view Recipe's rid", rid);


		axios.get(`/api/v1/recipe/${rid.ref}`)
			.then(response => {
				console.log(response);
				this.setState({
					author: response.data.author,
					name: response.data.name,
					imageUrl: response.data.imageUrl,
					category: response.data.category,
					ingredients: response.data.ingredients,
					recipe: response.data.recipe
				}, () => {
					console.log('The ingredients are: ', this.state.ingredients)
				})
			})

	}



	render() {
		return (
			<div className="wrapper">
				<button className="print-btn" onClick={() => window.print()}><i className="fas fa-print"></i> PRINT</button>
				<div className="wrappingRecipe">
					<img className="recipeImage" src={this.state.imageUrl} />
					<form>
						<div>
							<input className="title" type="text" readOnly={true} value={this.state.name} />
							<hr />
							<div className="author-section">
								<h4>By, <span>{this.state.author} </span></h4>
							</div>
						</div>

						<div className="recipeCategory">
							<label className="allLabel">Category:</label>
							<input className="categoryInput" readOnly={true} type="text" readOnly={true} value={this.state.category} />
						</div>
						<div className="recipeInstructions">
							<div>
								<label className="allLabel">Ingredients:</label>
							</div>

							{this.state.ingredients.map((aIngredient, index) => {
								return (
									<div key={index}>
										<ul>
											<li>{aIngredient.aIngredient}</li>
										</ul>
									</div>
								)
							})}
						</div>
						<div className="recipeInstructions">
							<div>
								<label className="allLabel">Instruction:</label>
							</div>
							{this.state.recipe.map((instruction, i) => {
								return (
									<div key={i}>
										<ul>
											<label class="container">
												<input type="checkbox" />
												{instruction.instruction}
												<span class="checkmark"></span>
											</label>
										</ul>
									</div>
								)
							})}
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default ViewRecipe
