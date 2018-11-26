import  React, { Component, Fragment } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom';
import logo from '../css/assets/logo1.jpg';

class Navbar extends Component {
  state = { activeItem: '/home' }
  render() {
  const { activeItem } = this.state
  return (
    <nav className= "navbar">
      <p
        className= "home-name"
        to= '/'> <img src={logo} className= "main-logo" alt= "logo" />
      </p>
      <div>
      <NavLink
        className="nav-button p-browse"
        to="/photographers"> Home </NavLink>
      <NavLink
        className="nav-button p-browse"
        to="/photographers"> Photographers</NavLink>
      <NavLink
        className="nav-button p-browse"
        to="/photographers"> Gallery</NavLink>
      <NavLink
         to="/started" className="nav-button login"> Log In </NavLink>
      </div>
    </nav>

  )
}
}


export default Navbar
