import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

const withData = (Wrapper, getData) => {
    return class extends Component {
    
    state = {
        data: null,
        error: false
    }
    
    componentDidMount() {
        getData()
        .then(data => {
          this.setState({
            data
          })
        })
    }
  
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const { data, error } = this.state
      
        if(!data) {
          return <Spinner />
        }

        if(error) {
            return <ErrorIndicator />
        }
  
        return <Wrapper data={data} {...this.props} />
      }
    }
  }
export default withData;