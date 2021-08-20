import React, { Component } from 'react';
import SwapiService from '../../services/swapi-services';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator/error-idicator';

import './person-details.css';

export default class PersonDetails extends Component {

  swapi = new SwapiService();

  state = {
    person: null,
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.personSelected !== prevProps.personSelected) {
      this.getPersonData()
    }
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
    })
  }

  getPersonData = () => {
    const {personSelected} = this.props
    if (!personSelected) {
      return
    }
    this.swapi
    .getPerson(personSelected)
    .then(this.onPersonLoaded)
  }

  render() {
    const {person} = this.state
    
    if (!person) {
      return <span>Choose person from list</span>
    }

    const element = <Person person={person} /> 

    return (
      <>
        { element }
      </>
    )
  }
}

const Person = ({person}) => {

  const {id, name, gender, birthYear, eyeColor} = person

  return (
    <div key={id} className="person-details card">
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          {/* <ErrorButton /> */}
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}