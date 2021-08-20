import React from 'react';
import img from './death-star.png'

function ErrorIndicator() {
    return (
        <div className="d-flex w-100 align-items-center flex-column">
            <img src={img} className="col-1"/>
            <h3>BOOM!</h3>
            <span>Something went wrong</span>
            <span>(Maybe because in our site attack droids)</span>
        </div>
    );
}

export default ErrorIndicator;