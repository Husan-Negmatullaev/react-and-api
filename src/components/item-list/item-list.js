import React, { Component } from 'react';
import SwapiService from '../../services/swapi-services';
import withData from '../hoc-helpers';
import Spinner from '../spinner/spinner';

import './item-list.css';

const ItemList = (props) => {
  
  const { data, onPersonSelected, children: renderLabel } = props

  const renderItems = (people) => {
    return people.map((item) => {
      const { id } = item
      const label = renderLabel(item)
      
      return (
        <li key={id} className="list-group-item" onClick={() => onPersonSelected(id)}>
          {label}
        </li>
      )
    })
  }

  const elements = renderItems(data)

  return (
    <ul className="item-list list-group">
      {elements}
    </ul>
  );
}

const { getAllPeople } = new SwapiService()


export default withData(ItemList, getAllPeople)