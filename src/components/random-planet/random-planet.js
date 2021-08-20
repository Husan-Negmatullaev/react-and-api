import React, { Component } from 'react';
import SwapiService from '../../services/swapi-services';
import ErrorIndicator from '../error-indicator/error-idicator';
import Spinner from '../spinner/spinner';
import './random-planet.css';

export default class RandomPlanet extends Component { 
  swapi = new SwapiService()

  state = {
    planet: {},
    loading: true,
  }

  constructor() {
    super()
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
      visible: false,
    })
  }

  componentDidMount() {
    this.updatePlanet()
    this.interval = setInterval(() => this.updatePlanet(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    const id = Math.floor((Math.random() * 25)) + 3
    this.swapi
    .getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError)
  }
  
  render() {
    const {planet, loading, error} = this.state

    const hasData = !(loading || error)

    const errorIndicator = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet} /> : null

    return (
      <div className="random-planet jumbotron rounded mb-3">
        {errorIndicator}
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {

  const {name, population, rotationPeriod, diametr, id} = planet

  return (
    <>
      <img className="planet-image" 
                      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="menage-id" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diametr}</span>
          </li>
        </ul>
      </div>
    </>
  )
}