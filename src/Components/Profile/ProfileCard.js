import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../Profile/ProfileCard.css';


class ProfileCard extends Component {
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
                            <h2 className='recipe_title'>{aRecipe.name}</h2>
                            <img className="recipe__box-img" src={aRecipe.imageUrl} alt={aRecipe.name} />
                            <h4>Ingredients: </h4>
                            {aRecipe.ingredient.map((aIngredient, index) => {
                                return (
                                    <div key={index}>
                                        <ul>
                                            <li>{aIngredient.aIngredient}</li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    )


                })}
            </div>


        );
    };
}


export default ProfileCard;
