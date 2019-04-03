//Implements routing for all views

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Landing from "./Components/Landing/Landing";
import Navigation from "./Components/Navigation/Navigation";


const App = () => (
	<div>
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/" component={Landing} exact />
				<Route path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default App;
