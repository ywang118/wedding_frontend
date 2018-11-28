import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Tab,Grid,Segment,Button,Modal } from 'semantic-ui-react';
import {setCurrentPhotographer} from '../store/actions/index';

import Flickity from 'react-flickity-component'
import 'semantic-ui-css/semantic.min.css'
class PhotographerDetailPage extends Component {

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/photographers/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(photographer => {
      this.props.setCurrentPhotographer(photographer)
    })
  }

  ///////      //////////             image Galleries               ////////////
  flickityOptions = {
    initialIndex: 1,
  }

  transport(){
    if (this.props.photographer.images){
      let i = this.props.photographer.images.map(image=>
        <img key={image.id} src={image.image_url}/>)
      return i
    }
  }

  Carousel(){
    return (
      <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={this.flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
    >

      {this.transport()}
    </Flickity>
    )
  }


  ///////////////                        tabs                              ////////////////////
  renderTabs(){
    return ([
    { menuItem: 'About', render: () => <Tab.Pane attached={false}>{this.about()}</Tab.Pane> },
    { menuItem: 'Details', render: () => <Tab.Pane attached={false}>{this.detail()}</Tab.Pane> },
    { menuItem: 'Reviews', render: () => <Tab.Pane attached={false}>{this.reviews()}</Tab.Pane> },
    { menuItem: 'Contact', render: () => <Tab.Pane attached={false}>{this.contact()}</Tab.Pane> },
    ])
  }
//about
  about(){
    if (this.props.photographer.images){

      return (
        <div className="photographer-segment">
        <h1>About This Vendor</h1>
        <p className= "photographer-about">"{this.props.photographer.about.split('\n')[0]}"</p>
        <p>{this.props.photographer.about.split('\n')[1]}</p>
        </div>
      )
    }
  }
  // Details
    detail(){
      return(
        <div className="photographer-segment">
          <h1> Details </h1>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <p id="photographer-title">Photo & Video</p>
                <p>{this.props.photographer.photo_video}</p>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <p id="photographer-title">Photo Shoot Types</p>
                  <p>{this.props.photographer.shoot_type}</p>
                  <p id="photographer-title">Photo & Video Styles</p>
                  <p>{this.props.photographer.style}</p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }

  //Reviews
  reviews(){
    return(
      <Fragment>
      <div className="photographer-segment">
        <h1> {this.props.photographer.name} Reviews </h1>
        <p id="write-review"> Share your thoughts with other couples </p>
        <Button inverted color='pink' className= "styles__button-with-reviews">
          Write a Review
        </Button>
      </div>

      <div className="styles-review-wrapper">
      <p>Reviews</p>
      </div>
      </Fragment>

    )
  }
  //contact()
  contact(){

    return(
      <div className="photographer-segment">
        <h1>Contact Info for {this.props.photographer.name}</h1>
        <p>{this.props.photographer.address ? this.props.photographer.address : "NewYork, NY"}</p>
        <p>Phone Number: {this.props.photographer.phone} </p>
      </div>
    )
  }
  //////////////                  price and book segment                     //////////////

  render(){

    return (
      <Fragment>
        {this.Carousel()}

        <div className= "tabbar">
          <div className="ui grid ">
            <div className="ten wide column left-segment">
              <Tab menu={{ secondary: true, pointing: true }} panes={this.renderTabs()} />
            </div>

            <div className="five wide column right-segment">
              <Segment>
                <div className="inlinestyle">
                  <p>${this.props.photographer.price}</p>   <span>Starting Price</span>
                </div>
                <div className="style-vertical">
                  <Button color='blue'>Book Now</Button>
                </div>
              </Segment>
            </div>
          </div>
        </div>
      </Fragment>
    )

  }
}
const mapStateToProps = state => ({

  photographer: state.photographerReducer.currentPhotographer
})

export default connect(mapStateToProps, { setCurrentPhotographer})(PhotographerDetailPage)
