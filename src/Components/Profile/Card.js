import React, { Component } from 'react';
import '../Profile/Card.css';
import faker from 'faker';

var receipeContent = '1.Preheat oven to 350°.Cream butter, shortening and sugar until light and fluffy.'

class Card extends Component {

    render() {
        return (
            <div className="allRecipeCards">
                <div className="oneRecipe">
                        <a href="/" className="receipeImage">
                            <img alt="receipeImage" src={faker.image.food()}/>
                        </a>
                    <div className="content">
                        <a href="/" className="receipeName">
                            Suger Cookie
                        </a>
                        <div className="metadata">
                            <span className="data"> Today at 6:00PM</span>
                        </div>
                        <div className="recipeContent"> 
                            {receipeContent}
                        </div>
                        <a href="#" className="button">Edit</a> 
                    </div>
                </div>
            </div>   
        );
    }
}



export default Card;