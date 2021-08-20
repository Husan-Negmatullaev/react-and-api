import React, {Component} from 'react';

export default class ErrorButton extends Component {
    
    state = {
        error: true
    }

    render() {
        console.log('render');
        if (this.state.error) {
            this.foo.error = true
        }

        return (
            <div>
                <button className="btn btn-danger">Throw error</button>            
            </div>
        );
    }
}
