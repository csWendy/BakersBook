import React from "react";

import './SideDrawer.css';

const SideDrawer = props => {

    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href='/'>Login </a></li>
                <hr />
                <li><a href='/'>Sign Up </a></li>
            </ul>
        </nav>
    );
};

export default SideDrawer;
