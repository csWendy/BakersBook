import React, { Component } from 'react';
import axios from "axios";

import bread from "../../assets/images/bread.jpg"

import "./ViewRecipe.css"
import {NavLink} from "react-router-dom";

class ViewRecipe extends Component {
    constructor(props){
        super(props)
        this.state={
             rid:"MIk7mGaQEMvIEM5YBAvY",
            name:"Chocolate Cake",
            imageUrl:"",
            category:"Cake",
            recipe:[
                "add a instruction",
                "test",
                "test1",
                "another instruction"
            ]
        }
    }

    componentDidMount() {
        axios.get(`/api/v1/recipe/${this.state.rid}`)
            .then(response => {
                console.log("view a recipe:",response)
                this.setState({
                    name:response.data.name,
                    imageUrl:response.data.imageUrl,
                    category:response.data.category,
                    recipe:response.data.recipe
                        .map(d=>d.instruction).join("\n")
                })
            })
    }

    render(){
        return(
            <div className="wrapper">
                <div className="wrappingRecipe">
                    <img className="recipeImage" src={this.state.imageUrl}/>
                    <form>
                        <div>
                            <input className="title" type="text" readOnly={true} value = {this.state.name}/>
                        </div>

                        <div className="recipeCategory">
                            <label className="allLabel">Category:</label>
                            <input  className="categoryInput" readOnly={true} type="text" readOnly={true} value={this.state.category}/>
                        </div>
                        <div className="recipeInstructions">
                            <div>
                                <label className="allLabel">Instruction:</label>
                            </div>
                            <textarea className="instructionInput" readOnly={true} type="text" readOnly={true} value={this.state.recipe}/>
                        </div>
                    </form>
                </div>

                <NavLink className="backButton" to="/">Go Back</NavLink>
            </div>
        );
    }
}

export default ViewRecipe