import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import PeoplePage from '../people-page/people-page';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button/error-button';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      visible: true,
      personSelected: null,
      errorIndicator: false
    }
  }

  onPersonSelected = (id) => {
    this.setState({
      personSelected: id
    })
  }

  toggleVisible = () => {
    this.setState(({visible}) => {
      return {
        visible: !visible
      }
    })
  }

  componentDidCatch() {
    this.setState({
      errorIndicator: true
    })
  }

  render() {
    const { visible, personSelected, errorIndicator } = this.state

    if (errorIndicator) {
      return <ErrorIndicator />
    }

    return (
      <div className="container">
        <Header />
        {
          visible ?
          <RandomPlanet />
          :
          null
        }
        <button className="btn-lg btn-primary" onClick={this.toggleVisible}>Toggle visible</button>
        {/* <ErrorButton /> */}
        <PeoplePage personSelected={personSelected} />
      </div>
    );
  }
};