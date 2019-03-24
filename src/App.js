import React, { Component } from 'react';

import Navigation from "./Components/Navigation/Navigation";
import Landing from "./Components/Landing";


class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Landing />
      </div>
    );
  }
}

export default App;
