import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Categories from '../Categories/Categories';

import "../RecipeForm/RecipeForm.css";

import firebase from '../../fbConfig/firebaseConfig';
var storage = firebase.storage();
var storageRef = storage.ref();
const imgRef = storageRef.child('images')

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            recipe: [],
            rid: "",
            imageUrl: "",
            accessToken: ""
        }
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
        })
    }


    render() {
        AOS.init(); //initalize Scrolling Animation.(Note: must be modified)

        return (
            <div className="recipeContainer">
                <form>
                    <section className="step1">
                        <div data-aos="fade-down" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                            <h2> To start, let's name your recipe!</h2>
                            <input type="text" name="recipeName" placeholder="Enter recipe name" />
                            <button><i className="fas fa-chevron-down"></i></button>
                        </div>
                    </section>

                    <section className="step2">
                        <h2> Pick the Category </h2>
                        <Categories />
                    </section>

                    <section className="step3">
                        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                            <h2> What's your secret recipe? </h2>
                            <textarea name="directions" placeholder="The first step is ..."></textarea>
                            {/* <button><i className="fas fa-chevron-down"></i></button> */}
                        </div>

                    </section>

                    <section className="step4">
                        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                            <h2> Set your thumbnail picture for your recipe. </h2>

                            <input type="file" name="pic" accept="image/*" onChange={this.handleUpload}></input>

                        </div>
                    </section>

                    <div className="recipeSubmit">
                        <input type="submit" />
                    </div>

                </form>
            </div>

        )
    }
}

export default RecipeForm;
