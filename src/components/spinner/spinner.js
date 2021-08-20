import React from 'react';
import './spinner.css'

function Spinner() {
    return (
        <div className="lds-ring w-100 d-flex justify-content-center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;