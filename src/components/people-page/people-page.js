import React, {Component} from 'react'
import SwapiService from '../../services/swapi-services'
import ErrorIndicator from '../error-indicator/error-idicator'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import Row from '../UI/Row'

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
        this.setState({
            errorIndicator: true
        })
    }

    render() {
        const { errorIndicator } = this.state
        const { getData } = this.props

        const itemList = (
            <ItemList 
                onPersonSelected={this.onTogglePerson}
                getData={getData}
            >
                {(item) => (
                    `${item.name} (${item.gender}, ${item.birthYear})`
                )}
            </ItemList>
        )

        const personDetails = (
            <PersonDetails personSelected={this.state.person} />
        ) 
        
        if (errorIndicator) {
            return <ErrorIndicator />
        }

        return (
            <Row left={itemList} right={personDetails} />
        )
    }

}