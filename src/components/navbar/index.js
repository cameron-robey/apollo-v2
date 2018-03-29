//React imports
import React, { Component } from 'react';

//Styles
import './navbar.css';

//Config import
import {main, colours} from './../../config.js';

//Import font awesome
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class NavBar extends Component {
  render() {
    return (
        <div className="navbar" style={{background: colours.lightGrey}}>
            Navbar
        </div>
    );
  }
}

export default NavBar;
