import React from 'react';

import './toggleButton.css';

const ToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button-line "></div>
        <div className="toggle-button-line "></div>
        <div className="toggle-button-line "></div>
    </button>

);

export default ToggleButton;
