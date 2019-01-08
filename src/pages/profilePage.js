import React, { Component, Fragment } from 'react';
import {backendEndpoint} from '../keys';
import { render } from "react-dom";
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';
import UserPhotographers from '../components/userPhotographers'
import * as Scroll from 'react-scroll';
import empty from '../css/assets/empty.png';
import { Button, TextArea, Form, Image } from 'semantic-ui-react';
import changeProfilePhoto from '../css/assets/change-profile-photo.png';
import header from '../css/assets/header.jpg';
import {updateProfilePhoto} from '../store/actions/index'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
const styles={
  textAligh: "center"
}

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  state = {
    orders: [],
    comments: [],
    likes: [],
  }

  componentDidMount(){
    Events.scrollEvent.register("begin", function() {
    console.log("begin", arguments);
  });

  Events.scrollEvent.register("end", function() {
    console.log("end", arguments);
  });

  scrollSpy.update();
    fetch(`${backendEndpoint}/comments`)
      .then(res=>res.json())
      .then(resJson=> {
        this.setState({
          comments: resJson
        })
      })

    fetch(`${backendEndpoint}/orders`)
      .then(res=>res.json())
      .then(resJson=> {
        this.setState({
          orders: resJson
        })
      })
    fetch(`${backendEndpoint}/user_photographers`)
      .then(res=>res.json())
      .then(resJson=> {
        this.setState({
          likes: resJson
        })
      })

  }  ///end of componentDidMount

  scrollToTop() {
    scroll.scrollToTop();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  renderelikedphotographers(){
    if(this.state.likes.length> 0){
      let a=  this.state.likes.filter(like=> like.user_id===this.props.user.id)
      return a.map(like=> like.photographer)
    }
  }


  renderLink(){
    return (
      <div>
        <nav className="navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul>
                <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >profile</Link></li>
                <li><Link activeClass="active" className="test1" to="test2" spy={true} smooth={true} duration={500}>Saved Photographers</Link></li>
                <li><Link activeClass="active" className="test1" to="test3" spy={true} smooth={true} duration={500} >Comments</Link></li>
                <li><Link activeClass="active" className="test1" to="test4" spy={true} smooth={true} duration={500}>Booked</Link></li>

              </ul>

            </div>
          </div>
        </nav>
          <Element name="test1" className="profile-photographerlist" >
            <div>
            <h1>My Profile</h1>
            {this.renderProfile()}
            </div>
          </Element>

          <Element name="test2" className="profile-photographerlist">
            <h2>My Saved Wedding Photographers</h2>
            <UserPhotographers photographers={this.renderelikedphotographers()}/>
          </Element>

          <Element name="test3" className="profile-photographerlist">
            <h2>My Comments</h2>
            {this.renderComment()}
          </Element>

          <Element name="test4" className="profile-photographerlist" style={{marginBottom: "400px"}}>
            <h2>My Orders</h2>
            {this.renderOrders()}
          </Element>
      </div>
    )
  }

  handleClick=(event)=>{


    let id =event.target.parentElement.parentElement.id

    if(this.state.comments.length>0){

      let user_Comment= this.state.comments.find(comment=> comment.id ==id ).photographer_id
      // console.log(user_Comment)
      window.location.href = `http://localhost:3001/photographers/${user_Comment}`
    }
  }
  handleOrder=(event)=>{
    let id =event.target.parentElement.parentElement.id

    if(this.state.orders.length>0){

      let user_Order= this.state.orders.find(order=> order.id ==id ).photographer_id

      window.location.href = `http://localhost:3001/photographers/${user_Order}`
    }
  }
  renderComment(){
    if(this.state.comments.length>0){
    let user_Comment= (this.state.comments.filter(comment=> comment.user_id === this.props.user.id))


    if(user_Comment.length> 0 ){
      return user_Comment.map(comment=><div id={comment.id}key={comment.id} className="profile-review">
       <div className="reviewRating"><a onClick={this.handleClick} style={{cursor: 'pointer'}}>Reviewed On {comment.date}, {comment.photographer.name}</a></div>
        <div className="review-body">{comment.description}</div>
        </div> )
    }
  }
  }

  handleChange= (event) => {
    this.props.updateProfilePhoto(this.props.user.id, event.target.files[0])
  }


  renderImage(){
    return (
     <label htmlFor="file-upload">
      <div className="profile-container">
      {this.props.user.avatar ?
        <Image size="medium"  src={this.props.user.avatar} avatar arl="" />:<div className="profile-overlay overlay-fade">
          <Image className="overlay-image" size="medium" circular src={changeProfilePhoto} arl="" />
        </div> }

       </div>
       <br />
       <br/>
       <input id="file-upload" type="file" onChange={this.handleChange} />
     </label>
   )
  }
  renderProfile(){
    return (
      <div>
      <h2>Nice to See You Again, {this.props.user.username.toLocaleUpperCase()} !</h2>
      {this.renderImage()}
      </div>
    )
  }
  renderOrders(){
    if(this.state.orders.length>0){
    let user_order= (this.state.orders.filter(order=> order.user_id === this.props.user.id))


    if(user_order.length> 0 ){
      return user_order.map(order=><div id= {order.id}key={order.id}className="review">
       <div className="review-body"><a onClick={this.handleOrder} style={{cursor: 'pointer'}}>Booked on {order.date}with {order.photographer.name}</a></div>

        </div> )
     } else{
        return <img src={empty} alt="this user does not have any upcoming photographers" width="720px" height="400px"/>
     }
   }
  }

 test(){
   if(this.state.comments.length>0){
      return this.state.comments.filter(comment=> comment.user_id == this.props.user.id)
   }
 }






  render(){

    console.log(this.renderelikedphotographers())
    console.log(this.props.user.photographers)

    return(
      <Fragment>
      <div className="main-banner">
        <h1 className="valign">
          My Profile Page
        </h1>
      </div>
      <div>{this.renderLink()} </div>

      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default withAuth(connect(mapStateToProps, {updateProfilePhoto})(ProfilePage));
