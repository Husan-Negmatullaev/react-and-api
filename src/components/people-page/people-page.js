import React, {Component} from 'react'
import SwapiService from '../../services/swapi-services'
import ErrorIndicator from '../error-indicator/error-idicator'
import ItemList from '../item-list'
import PersonDetails from '../person-details'

import './people-page.css'

export default class PeoplePage extends Component {

    state = {
        person: 2,
        errorIndicator: false
    }

    onTogglePerson = (person) => {
        this.setState({
            person
        })
    }

    componentDidCatch() {
        console.log('componentDidCatch()')
        this.setState({
            errorIndicator: true
        })
    }

    render() {
        const {errorIndicator} = this.state
        
        if (errorIndicator) {
            return <ErrorIndicator />
        }

        return (
            <div className="row my-3">
                <div className="col-md-6">
                    <ItemList onPersonSelected={this.onTogglePerson} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personSelected={this.state.person} />
                </div>
            </div>
        )
    }

}