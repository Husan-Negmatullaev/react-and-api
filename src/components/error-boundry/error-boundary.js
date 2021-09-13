import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component {

    state = {
        errorIndicator: false
    }

    componentDidCatch() {
        this.setState({
            errorIndicator: true
        })
    }

    render() {
        const { errorIndicator } = this.state
        const { children } = this.props

        if (errorIndicator) {
            <ErrorIndicator />
        }

        return (
            <>
                {children}
            </>
        );
    }
}