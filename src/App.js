//Implements routing for all views

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Register from './Components/Register/Register';
import Landing from "./Components/Landing/Landing";


const App = () => (
	<div>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Landing} exact />
				<Route path="/register" component={Register} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default App;
