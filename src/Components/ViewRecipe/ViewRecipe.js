import React, { Component } from 'react';
import axios from "axios";

import bread from "../../assets/images/bread.jpg"

import "./ViewRecipe.css"
import { NavLink } from "react-router-dom";
import queryString from "query-string";

class ViewRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // rid :rid,
            name: "",
            imageUrl: "",
            category: "",
            ingredient:[],
            recipe: []
        }
    }

    componentDidMount() {
        const rid = queryString.parse(this.props.location.search)
        console.log("view Recipe", rid);

        axios.get(`/api/v1/recipe/${rid.ref}`)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    imageUrl: response.data.imageUrl,
                    category: response.data.category,
                    ingredient:response.data.ingredient
                        .map(d=>d.aIngredient).join("\n"),
                    recipe: response.data.recipe
                        .map(d => d.instruction).join("\n")
                })
            })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrappingRecipe">
                    <img className="recipeImage" src={this.state.imageUrl} />
                    <form>
                        <div>
                            <input className="title" type="text" readOnly={true} value={this.state.name} />
                        </div>

                        <div className="recipeCategory">
                            <label className="allLabel">Category:</label>
                            <input className="categoryInput" readOnly={true} type="text" readOnly={true} value={this.state.category} />
                        </div>
                        <div className="recipeInstructions">
                            <div>
                                <label className="allLabel">Ingredients:</label>
                            </div>
                            <textarea className="instructionInput" readOnly={true} type="text" readOnly={true} value={this.state.ingredient} />
                        </div>
                        <div className="recipeInstructions">
                            <div>
                                <label className="allLabel">Instruction:</label>
                            </div>
                            <textarea className="instructionInput" readOnly={true} type="text" readOnly={true} value={this.state.recipe} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ViewRecipe
