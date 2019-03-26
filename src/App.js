import React, { Component } from 'react';

import Navigation from "./Components/Navigation/Navigation";
import SideDrawer from './Components/Navigation/SideDrawer';
import Landing from "./Components/Landing";
import Backdrop from './Components/Navigation/backdrop/Backdrop';

import './Index.css';


class App extends Component {
  state = {
    sideDrawerOpen: false
  }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    });

  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div style={{ height: '100%' }}>
        <Navigation drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <Landing />
      </div>
    );
  }
}

export default App;
