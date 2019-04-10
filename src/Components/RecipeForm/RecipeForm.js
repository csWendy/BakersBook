import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import firebase from '../../fbConfig/firebaseConfig';
import Categories from '../Categories/Categories';

import "../RecipeForm/RecipeForm.css";
import DefaultImg from '../../assets/images/default-thumbnail.png'


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
			name: "",
			category: "",
			recipe: [{ instruction: "" }],
			rid: "",
			imageUrl: "",
			accessToken: ""
		}
	}

	handleChange = event => {
		this.setState({ recipeName: event.target.value });
		console.log(this.state.recipeName);

	};

	handleNameChange = event => {
		this.setState({ instruction: event.target.value });
	}
	handleInstructionChange = idx => event => {
		const newRecipe = this.state.recipe.map((instruction, sidx) => {
			if (idx !== sidx) return instruction;
			return { ...instruction, instruction: event.target.value };
		});
		this.setState({ recipe: newRecipe });
		console.log(newRecipe);
	};

	//Add each instruction to recipe array
	handleAddInstruction = () => {
		this.setState({
			recipe: this.state.recipe.concat([{ instruction: "" }])
		});

	};

	handleRemoveInstruction = idx => () => {
		this.setState({
			recipe: this.state.recipe.filter((s, sidx) => idx !== sidx)
		});
	};

	handleScroll = (event) => {
		window.scrollTo(0, this.myRef.current.offsetTop);
		event.preventDefault();
	}



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



	render() {
		AOS.init(); //initalize Scrolling Animation.(Note: must be modified)

		const img = (this.state.imageUrl === "") ?
			<img className="thumbnailConstraints" src={DefaultImg} /> :
			<img className="thumbnailConstraints" src={this.state.imageUrl} />
		return (
			<div className="recipeContainer">
				<form>
					<section className="step1">
						<div data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> To start, let's name your recipe!</h2>
							<input type="text" name="recipeName" value={this.state.recipeName} placeholder="Enter recipe name" onChange={this.handleChange} />

						</div>
					</section>

					<section className="step2">
						<h2> Pick the Category </h2>
						<Categories />
					</section>

					<section className="step3">
						<div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> What's your secret recipe? </h2>
							{this.state.recipe.map((instruction, idx) => (
								<div className="Instructions">
									<input
										type="text"
										placeholder="Add a instruction"
										value={instruction.value}
										onChange={this.handleInstructionChange(idx)}
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
							<button
								type="button"
								onClick={this.handleAddInstruction}
								className="addBtn"
							>
								Add Instruction
                            </button>
							<br />
							<button className="doneBtn" onClick={this.handleScroll}>Done</button>
						</div>

					</section>

					<section className="step4" ref={this.myRef}>
						<div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
							<h2> Set your thumbnail picture for your recipe. </h2>
							{img}
							<input type="file" name="pic" accept="image/*" onChange={this.handleUpload}></input>

						</div>
					</section>

					<div className="recipeSubmit">
						<input type="submit" onSubmit={this.handleSubmit} />
					</div>

				</form>
			</div>

		)
	}
}

export default RecipeForm;
