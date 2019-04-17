//Implements routing for all views

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import RecipeForm from './Components/RecipeForm/RecipeForm';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Landing from "./Components/Landing/Landing";
import Navigation from "./Components/Navigation/Navigation";
import Profile from "./Components/Profile/Profile";


const App = () => (
	<div>
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/" component={Landing} exact />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/recipeform" component={RecipeForm} />
				<Route exact path="/profile" component={Profile}/>
			</Switch>
		</BrowserRouter>
	</div>
);

export default App;
