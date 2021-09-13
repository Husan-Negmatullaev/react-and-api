import React, { Component } from 'react';
import SwapiService from '../../services/swapi-services';

import './item-details.css';

const Record = ({person, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{person[field]}</span>
    </li>
  )
}

export {
  Record
}

export default class ItemDetails extends Component {

  swapi = new SwapiService();

  state = {
    person: null,
    image: null
  }
  
  componentDidMount() {
    this.getPersonData()
  }

  getPersonData = () => {
    const { itemId, getData, getImage } = this.props
    if (!itemId) {
      return
    }
    getData(itemId)
    .then((person) => {
      this.setState({
        person,
        image: getImage(person)
      })
    })
  }

  render() {
    const {person, image} = this.state
    
    if (!person) {
      return <span>Choose person from list</span>
    }

    const {id, name, gender, birthYear, eyeColor} = person

    return (
      <div key={id} className="person-details card">
        <img className="person-image"
          src={image} />
  
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {person})
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}