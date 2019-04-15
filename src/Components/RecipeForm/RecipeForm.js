import React, { Component } from 'react';
import axios from 'axios';

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
		this.myRef = React.createRef();
		this.state = {
			recipeName: "",
			instruction: "",
			category: "",
			recipe: [{ instruction: "" }],
			rid: "",
			imageUrl: "",
			accessToken: ""
		}
	}
	/*start pageload at top (due to autoFocus on instruction input)*/
	componentDidMount() {
		window.scrollTo(0, 0)
	}

	// handleScroll = (event) => {
	// 	event.preventDefault();
	// 	window.scrollTo(0, 2000);
	// }


	/*handle Name*/
	handleNameChange = (event) => {
		this.setState({
			recipeName: event.target.value
		}, () => {
			console.log('The recipe name is', this.state.recipeName)
		})

	};

	/*handle Categories*/
	categoryChange = (value) => {

		this.setState({
			category: value
		}, () => {
			console.log('The category is', this.state.category)
		})


	}

	handleInstructionChange = idx => event => {
		const newRecipe = this.state.recipe.map((instruction, sidx) => {
			if (idx !== sidx) return instruction;
			return { ...instruction, instruction: event.target.value };
		});
		this.setState({ recipe: newRecipe });
		console.log('The recipe', newRecipe);
	};

	//concat each instruction to recipe array
	handleAddInstruction = (event) => {
		if (event.key == 'Enter') {
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
		console.log("Submiting form...");

		let payload = {
			'name': this.state.recipeName,
			'imageUrl': this.state.imageUrl,
			'category': this.state.category,
			'recipe': this.state.recipe
		}
		let url = 'https://bakersbook-74fd9.firebaseapp.com/api/v1/recipe';

		axios.post(url, payload, {
			headers: {
				'Content-Type': null
			}

		})
			.then(response => {
				console.log(response);
				if (response.data.success) {
					console.log('recipe has been added');

				}
			}).catch((error) => {
				console.log("unable to post the recipe" + error);
			})
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
							<input type="text" name="recipeName" value={this.state.recipeName} placeholder="Enter recipe name" onChange={this.handleNameChange} />
							<div><i className="fas fa-chevron-down"></i></div>

						</div>
					</section>

					<section className="step2">
						<h2> Pick the Category </h2>
						<Categories categoryChange={this.categoryChange} />
					</section>

					<section className="step3">
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

					<section className="step4">
						<div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> Set your thumbnail picture for your recipe. </h2>
							<div className="thumbnail">
								{img}
								<br />
								<input type="file" name="pic" accept="image/*" onChange={this.handleUpload}></input>

							</div>
						</div>
					</section>

					<input type='submit'></input>
				</form>

			</div>

		)
	}
}

export default RecipeForm;
