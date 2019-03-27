import React, { Component } from 'react';

import {BrowserRouter, browserHistory, Route, Switch} from "react-router-dom";

import Register from './Components/Register/Register.js'

class App extends Component {
  render() {
    return (
      <div>
        <h1>BAKERS BOOK</h1>
          <BrowserRouter>
              <div>
                  <Route exact path = "/register" component={Register} />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
