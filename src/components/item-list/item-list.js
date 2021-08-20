import React, { Component } from 'react';
import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner/spinner';

import './item-list.css';

export default class ItemList extends Component {
  
  swapi = new SwapiService()

  state = {
    people: null
  }

  componentDidMount() {
    this.swapi
    .getAllPeople()
    .then(people => {
      this.setState({
        people
      })
    })
  }

  renderItems(people) {
    return people.map(({name, id}) => {
      return (
        <li key={id} className="list-group-item" onClick={() => this.props.onPersonSelected(id)}>
          {name}
        </li>
      )
    })
  }

  render() {
    const { people } = this.state
    
    if(!people) {
      return <Spinner />
    }    
    const elements = this.renderItems(people)

    return (
      <ul className="item-list list-group">
        {elements}
      </ul>
    );
  }
}
