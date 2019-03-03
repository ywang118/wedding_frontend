import  React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import logo from '../css/assets/logo1.jpg';
import {fetchCurrentUser} from '../store/actions/index';

class Navbar extends Component {
  state = { activeItem: '/home' }

  componentDidMount(){
    if(localStorage.getItem('jwt') && !this.props.user ){
      this.props.fetchCurrentUser()}
  }

  selectName = () => {
     this.setState({ activeItem:"logout" }, () => {
        console.log(this.state.activeItem);



      localStorage.removeItem("jwt");
      window.location.href = "https://evening-waters-70721.herokuapp.com/home";

    this.props.history.push("/logout")




     });
 }
  renderLoginProfile = () => {
   const { activeItem } = this.state
   if (this.props.user) {
     return (
      <>
       <NavLink
         className="nav-button p-browse"
         to="/profile" name ="/profile"> {`Welcome ${this.props.user.username.toUpperCase()}!`} </NavLink>
       <NavLink
         className="nav-button p-browse"
         to="/logout" name ="/logout" onClick={() => this.selectName()}> Logout </NavLink>
      </>
     )
   } else {
     return (
       <NavLink
          to="/login" name ="/login"className="nav-button login" > Log In </NavLink>
     )
   }
 }


  render() {

  const { activeItem } = this.state
  console.log(activeItem)
  return (
    <nav className= "navbar">

      <p
        className= "home-name"
        to= '/'> <img src={logo} className= "main-logo" alt= "logo" />
      </p>

      <span> </span><span> </span>
      <div>
      <NavLink
        className="nav-button p-browse"
        to="/home" name ="/home" > Home </NavLink>
      <NavLink
        className="nav-button p-browse"
        to="/photographers" name ="/photographers" > Photographers</NavLink>
      <NavLink
        className="nav-button p-browse"
        to="/gallery" name ="/gallery" > Gallery</NavLink>
      {this.renderLoginProfile()}

      </div>
    </nav>

  )
}
}
const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default withRouter(connect(mapStateToProps, { fetchCurrentUser })(Navbar));
