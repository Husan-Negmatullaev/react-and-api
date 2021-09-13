import React, { Component } from 'react';

import Header from '../header';

import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';
import ErrorBoundary from '../error-boundry';
import Row from '../UI/Row';
import ItemDetails from '../item-details';
import { Record } from '../item-details/item-details';
import ItemList from '../item-list/item-list';
import PeoplePage from '../people-page/people-page';
import RandomPlanet from '../random-planet'
import PersonDetails from '../person-details';

export default class App extends Component {

  swapi = new SwapiService()

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
    const { errorIndicator } = this.state
    const { getPerson, getStarship, getStarshipImage, getPersonImage, getAllPeople } = this.swapi

    if (errorIndicator) {
      return <ErrorIndicator itemList />
    }

    const PersonDetail = (
      <ItemDetails 
        itemId={10}
        getData={getPerson}
        getImage={getPersonImage}
      >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    )

    const StarshipDetail = (
      <ItemDetails 
        itemId={10}
        getData={getStarship}
        getImage={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    )
    
    const { personSelected, visible } = this.state

    return (
      <ErrorBoundary>
        <div className="container">
          <Header />

        {/* <PeoplePage 
          getData={this.swapi.getAllPeople}
          personSelected={personSelected}
        />  */}

        {
          visible ?
          <RandomPlanet />
          :
          null
        }
        <button className="btn-lg btn-primary" onClick={this.toggleVisible}>Toggle visible</button>

        <div className="row my-3">
          <div className="col-md-6">
            <ItemList 
              getData={this.swapi.getAllStarships}
              onPersonSelected={this.onPersonSelected}
            >
              {(item) => (
                <span>{item.name}<button className="btn btn-secondary">!</button></span>
              )}
            </ItemList>
          </div>
          <div className="col-md-6">
            <PersonDetails personSelected={personSelected} />
          </div>
        </div>
      </div>
      </ErrorBoundary>
    );
  }
};

// Row

{/* 
<PeoplePage 
    getData={this.swapi.getAllPeople}
    personSelected={personSelected}
/> 

{
  visible ?
  <RandomPlanet />
  :
  null
}
  <button className="btn-lg btn-primary" onClick={this.toggleVisible}>Toggle visible</button>

 <div className="row my-3">
  <div className="col-md-6">
    <ItemList 
      getData={this.swapi.getAllStarships}
      onPersonSelected={this.onTogglePerson}
    >
      {(item) => (
        <span>{item.name}<button className="btn btn-secondary">!</button></span>
      )}
    </ItemList>
  </div>
  <div className="col-md-6">
    <PersonDetails personSelected={this.state.person} />
  </div>
</div> */}