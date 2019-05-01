import React, { Component } from 'react';
import '../Profile/ProfileCard.css';
import faker from 'faker';
import {Card, CardImg, CardText,CardColumns, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';

var receipeName = 'Sugar cookie'
var recipeContent = '1.Preheat oven to 350°.Cream butter, shortening and sugar until light and fluffy.'
var uploadedTime ='Uploaded today 6:00PM'

class ProfileCard extends Component {

    render() {
        return (
            <CardColumns>
                <Card>
                    <CardImg top width="50%" alt="receipeImage" src={faker.image.food()}/>
                    <CardBody>
                        <CardTitle>{receipeName}</CardTitle>
                        <CardSubtitle>Uploaded today 6:00PM</CardSubtitle>
                        <CardText>{recipeContent}</CardText>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" alt="receipeImage" src={faker.image.food()} />
                    <CardBody>
                        <CardTitle>{receipeName}</CardTitle>
                        <CardSubtitle>{uploadedTime}</CardSubtitle>
                        <CardText>{recipeContent}</CardText>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </CardBody>
                </Card>
            </CardColumns>  





            // <div className="allRecipeCards">
            //     <div className="oneRecipe">
            //         <a href="/" className="receipeImage">
            //             <img alt="recipeImage" src={faker.image.food()} />
            //         </a>
            //         <div className="content">
            //             <a href="/" className="receipeName">
            //                 Suger Cookie
            //             </a>
            //             <div className="metadata">
            //                 <span className="data"> Today at 6:00PM</span>
            //             </div>
            //             <div className="recipeContent">
            //                 {recipeContent}
            //             </div>
            //             <a href="#" className="button">Edit</a>
            //         </div>
            //     </div>
            // </div> 
        );
    };
};



export default ProfileCard;