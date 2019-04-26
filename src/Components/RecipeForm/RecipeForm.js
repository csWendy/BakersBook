import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import AOS from 'aos';
import 'aos/dist/aos.css';
import "../RecipeForm/RecipeForm.css";
import DefaultImg from '../../assets/images/default-thumbnail.png'

import firebase from '../../fbConfig/firebaseConfig';

import Categories from '../Categories/Categories';

var storage = firebase.storage();
var storageRef = storage.ref();
const imgRef = storageRef.child('images')

class RecipeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeName: "",
			aIngredient: "",
			ingredient: [{ aIngredient: "" }],
			instruction: "",
			category: "",
			recipe: [{ instruction: "" }],
			rid: "",
			imageUrl: "",
			accessToken: ""
		}
		this.baseState = this.state
	}
	/*start pageload at top (due to autoFocus on instruction input)*/
	componentDidMount() {
		window.scrollTo(0, 0)
	}

	/*handle Name*/
	handleNameChange = (event) => {
		this.setState({
			recipeName: event.target.value
		}, () => {
			console.log('The recipe name is: ', this.state.recipeName)
		})

	};

	/*handle Categories*/
	categoryChange = (value) => {

		this.setState({
			category: value
		}, () => {
			console.log('The category is: ', this.state.category)
		})


	}

	/*handle ingredient change */
	handleIngredientChange = idx => event => {
		const newIngredient = this.state.ingredient.map((aIngredient, sidx) => {
			if (idx !== sidx) return aIngredient;
			return { ...aIngredient, aIngredient: event.target.value };
		});
		this.setState({ ingredient: newIngredient });
		console.log('The ingredients: ', newIngredient);
	};

	/*concat each indredient to array */
	handleAddIngredient = (event) => {
		if (event.key === 'Enter') {
			this.setState({
				ingredient: this.state.ingredient.concat([{ aIngredient: "" }])
			});
		}
	};

	/*filter out index to remove a instruction (not working :( ) */
	handleRemoveIngredient = idx => () => {
		console.log('the index', idx);
		const newIngredient = this.state.ingredient.filter((_, i) => {
			return idx !== i;
		});
		this.setState({
			ingredient: newIngredient
		}, () => {
			console.log(this.state.ingredient);
		})
	};

	handleInstructionChange = idx => event => {
		const newRecipe = this.state.recipe.map((instruction, sidx) => {
			if (idx !== sidx) return instruction;
			return { ...instruction, instruction: event.target.value };
		});
		this.setState({ recipe: newRecipe });
		console.log('The recipe: ', newRecipe);
	};

	//concat each instruction to recipe array
	handleAddInstruction = (event) => {
		if (event.key === 'Enter') {
			this.setState({
				recipe: this.state.recipe.concat([{ instruction: "" }])
			});
		}

	};

	/*filter out index to remove a instruction (not working :( ) */
	handleRemoveInstruction = idx => () => {
		console.log('the index', idx);

		const newRecipe = this.state.recipe.filter((_, i) => {
			return idx !== i;
		});
		this.setState({
			recipe: newRecipe
		}, () => {
			console.log(this.state.recipe);
		})
	};

	/*handle thumbnail upload */
	handleUpload = event => {
		console.log(event.target.files[0])
		const file = event.target.files[0]
		const filename = event.target.files[0].name
		const fileRef = imgRef.child(filename)
		fileRef.put(file)
			.then((snapshot) => {
				console.log(snapshot)
				console.log('Uploaded a blob or file!')
				fileRef.getDownloadURL()
					.then((url) => {
						console.log(`URL: ${url}`)
						this.setState({
							imageUrl: url
						})
					})
					.catch(error => {
						console.log("Error Downloading URL:", error)
					})
			})
			.catch(error => {
				console.log("Error uploading file:", error)
			})
	}

	/*submit form */
	handleSubmit = (event) => {
		event.preventDefault();
		console.log('the access token', this.props.accessToken)
		console.log("Submiting form...");

		axios({
			method: 'post',
			url: '/api/v1/recipe',
			headers: { Authorization: `Bearer ${this.props.accessToken}` },
			data: {
				name: this.state.recipeName,
				ingredient: this.state.ingredient,
				category: this.state.category,
				recipe: this.state.recipe,
				imageUrl: this.state.imageUrl
			}
		})
			.then(response => {
				console.log(response)
			})
			.catch(error => { console.log(error) })

		this.resetForm();
	}

	resetForm = () => {
		this.setState(this.baseState);
		window.scrollTo(0, 0)
	}

	render() {
		AOS.init(); //initalize Scrolling Animation.(Note: must be modified)

		const img = (this.state.imageUrl === "") ?
			<img className="thumbnailConstraints" src={DefaultImg} /> :
			<img className="thumbnailConstraints" src={this.state.imageUrl} />
		return (
			<div className="recipeContainer">
				<form onSubmit={this.handleSubmit}>
					<section className="step1">
						<div data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> To start, let's name your recipe!</h2>
							<input required type="text" name="recipeName" value={this.state.recipeName} placeholder="Enter recipe name" onChange={this.handleNameChange} />
							<div><i className="fas fa-chevron-down"></i></div>

						</div>
					</section>

					<section className="step2">
						<h2> Pick the Category </h2>
						<Categories categoryChange={this.categoryChange} />
					</section>

					<section className="step3">
						<div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> What are your ingredients? </h2>
							{this.state.ingredient.map((aIngredient, idx) => (
								<div className="Instructions" key={idx}>
									<input
										autoFocus
										required
										type="text"
										placeholder="Add a Ingredient"
										value={aIngredient.value}
										onChange={this.handleIngredientChange(idx)}
										onKeyPress={this.handleAddIngredient}
									/>
									<button
										type="button"
										onClick={this.handleRemoveIngredient(idx)}
										className="deleteBtn"
									>
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
							))}
							<div><i className="fas fa-chevron-down"></i></div>
						</div>
					</section>

					<section className="step4">
						<div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> What's your secret recipe? </h2>
							{this.state.recipe.map((instruction, idx) => (
								<div className="Instructions" key={idx}>
									<input
										autoFocus
										required
										type="text"
										placeholder="Add a instruction"
										value={instruction.value}
										onChange={this.handleInstructionChange(idx)}
										onKeyPress={this.handleAddInstruction}
									/>
									<button
										type="button"
										onClick={this.handleRemoveInstruction(idx)}
										className="deleteBtn"
									>
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
							))}
							<div><i className="fas fa-chevron-down"></i></div>
						</div>
					</section>

					<section className="step5">
						<div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> Set your thumbnail picture for your recipe. </h2>
							<div className="thumbnail">
								{img}
								<br />
								<input required type="file" name="pic" accept="image/*" onChange={this.handleUpload}></input>

							</div>
						</div>
					</section>

					<input type='submit'></input>
				</form>

			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		accessToken: state.auth.accessToken
	}
}
export default connect(mapStateToProps)(RecipeForm);
