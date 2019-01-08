import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Tab,Grid,Segment,Button,Modal,Icon,Popup,Image,Header } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import {setCurrentPhotographer, addUserPhotographer,deleteUserPhotographer,addOrder} from '../store/actions/index';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewCommentForm from '../components/NewCommentForm';
import StarRatings from 'react-star-ratings';
class PhotographerDetailPage extends Component {
  constructor(props) {
   super(props);
   this.state = {
     like: false,
     showModal: false,
     startDate: new Date(),
     comments: [],
     rating: 0,
     showComment: false,

   };
   this.handleChange = this.handleChange.bind(this);
 }
  // state = {
  //   like: false,
  //
  // }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/photographers/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(photographer => {
      this.props.setCurrentPhotographer(photographer)

      if(this.props.user && photographer.user_photographers.find(user=> user.user_id === this.props.user.id)) {
        this.setState({
          like: true
        })
      } else {
        this.setState({
          like:false
        })
      }
    })
    fetch('http://localhost:3000/api/v1/comments')
      .then(res=>res.json())
      .then(resJson=> {
        this.setState({
          comments: resJson
        })
      })
  }
  //////book order /////

  handelCancel=()=>{
    this.setState({ showModal: false })
  }
  handelSubmit=()=>{
    if(this.props.user){
      this.props.addOrder(this.props.photographer, this.props.user,this.state.startDate)
    } else{
      return <Popup trigger={   <Button className="date_btn"basic color='red' onClick={this.handelSubmit}>
          Submit
         </Button>} content="Please login to like this photographer!" />
    }

    this.setState({ showModal: false })
  }
  ////////////////////       add/ delete user_photographer              //////////////////////////////
    getUserPhotographer = () => {
      return this.props.photographer.user_photographers.find(userPhotographer => userPhotographer.user_id === this.props.user.id)
    }


  ///////      //////////             image Galleries               ////////////

  transport(){
    if (this.props.photographer.images){
      let i = this.props.photographer.images.map(image=>
        <div key={image.id} className="yours-custom-class"><img key={image.id} src={image.image_url} /></div>)
      return i
    }
  }

  responsive = {
      0: { items: 1 },
      600: { items: 2 },
      1024: { items: 3 },
    };

    galleryItems() {

        if (this.props.photographer.images){
        return (this.props.photographer.images.map((image) => (
        <img key={image.id} src={image.image_url} />
        ))
      )
      }

    };





  Carousel(){
    return (

      <AliceCarousel mouseDragEnabled >
        {this.transport()}
      </AliceCarousel>
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
                <div className="photographer-detail-photo">
                <p id="photographer-title">Photo & Video</p>
                <p>{this.props.photographer.photo_video}</p>
                </div>
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
  renderComment(){
    if(this.props.photographer.comments){
      return this.props.photographer.comments.map(comment=><div key={comment.id}className="review">
        <div className="reviewRating">Reviewed On {comment.date} by {this.state.comments.find(review=> review.user.id == comment.user_id).user.avatar ? <Image  src={this.state.comments.find(review=> review.user.id == comment.user_id).user.avatar} avatar arl="" />: null} {this.state.comments.find(review=> review.user.id == comment.user_id).user.username}</div>
        <div className="review-body">{comment.description}</div>
      </div> )


    }
  }

 close =()=> this.setState({showComment: false})
  reviews(){
    return(
      <Fragment>
      <div className="photographer-segment">
        <h1> {this.props.photographer.name} Reviews </h1>
        <p id="write-review"> Share your thoughts with other couples </p>

        <Modal dimmer="blurring" open={this.state.showComment} trigger={<Button onClick={() => this.setState({showComment: true})} inverted color='pink' className= "styles__button-with-reviews">
          Write a Review
        </Button>} >
          {this.renderForm()}

        </Modal>

      </div>

      <div className="styles-review-wrapper">
      {this.renderComment()}
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
  //////////////                  price/book/like segment                     //////////////

  handleLike = () => {
    if (this.props.user) {
      if (this.state.like) {
        this.props.deleteUserPhotographer(this.getUserPhotographer(), this.props.photographer, this.props.user)
        this.setState({
          like: !this.state.like
        })
      } else {
        this.props.addUserPhotographer(this.props.photographer, this.props.user)
        this.setState({
          like: !this.state.like
        })
      }
    }
  }

  renderLikeBtn = () => {
    const {like } = this.state

    if(this.props.user) {
      return  <Button basic color='red'
         onClick={this.handleLike} className="styles_like">
        {like ? `Unlike` : "Like" }
        </Button>

    } else {
      return <Popup trigger={<Button  color='red'
        onClick={this.handleLike} className="styles_like">
        {like ? "Unlike" : "Like" }
        </Button>} content="Please login to like this photographer!" />
    }
  }

//////////////////////   renderModal       //////////////////////
  renderModal = ()=> {
    if (this.props.user){

      return(
        <div className= "medium--3f2c6">

          <div className="index__xoWizard">

            <h3 className="index__header___2b8OB">Please Select A Date</h3>

          <Modal.Content>
          <DatePicker
       selected={this.state.startDate}
       onChange={this.handleChange}
     />
          </Modal.Content>
          <Modal.Actions>
     <Button className="date_btn"basic color='red' onClick={this.handelSubmit}>
      Submit
     </Button>
     <Button className="date_btn"basic color='blue' onClick={this.handelCancel}>
      Cancel
     </Button>

   </Modal.Actions>
          </div>
        </div>
       )
    }else {
      return (
        <div className="medium--3f2c6">
          <div className="index__xoWizard">
            <Modal.Content>

            <h3 className="index__header___2b8OB">
              Please login to complete the order
            </h3>
            </Modal.Content>
            <Modal.Actions>
              <Link to='/login'>
                <Button basic color="red">
                  <Icon name='checkmark' /> Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button basic color="green" >
                  <Icon name='checkmark' /> Signup
                </Button>
              </Link>
            </Modal.Actions>
            </div>
          </div>
        )
    }
  }

  changeRating(nextValue, name) {
    this.setState({
      rating: nextValue,

    });

  }


  renderForm = ()=>{
    //     <StarRatings
    //   rating={this.state.rating}
    //   starRatedColor="blue"
    //    changeRating={this.changeRating.bind(this)}
    //   numberOfStars={5}
    //   name='rating'
    // />
    return(
      <div className= "medium--3f2c6">

        <div className="index__xoWizard">

          <h3 className="index__header___2b8OB">{this.props.photographer.name} Photographer</h3>

        <Modal.Content>
          <p className="index__header___2b8OB">Share Your Honest Rating and Opinion</p>

          <NewCommentForm photographerId={this.props.photographer.id} userId={this.props.user.id} />
        </Modal.Content>
        </div>
      </div>
    )
  }



  ///////////////////////     render             //////////////////////
  render(){
    // console.log(this.test())
    const items = this.galleryItems();
    const {

      showModal
    } = this.state
    return (
      <Fragment>
      <AliceCarousel
      items={items}
      duration={400}
      autoPlay={true}
      startIndex = {0}
      fadeOutAnimation={true}
      mouseDragEnabled={true}
      playButtonEnabled={true}
      autoPlayInterval={2000}
      autoPlayDirection="ltr"
      responsive={this.responsive}
      disableAutoPlayOnAction={true}

    />

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
                <div className= "index__oneButton___2Gotm">

                <Modal dimmer="blurring"  open={showModal} trigger={<Button onClick={() => this.setState({showModal: true})} color='blue'>Book Now</Button>} >

                {this.renderModal()}
                </Modal>

                </div>
                <div className="index__oneButton___2Gotm">
                  {this.renderLikeBtn()}

              </div>
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
  user: state.userReducer.user,
  photographer: state.photographerReducer.currentPhotographer
})

export default connect(mapStateToProps, { setCurrentPhotographer,addUserPhotographer,deleteUserPhotographer,addOrder})(PhotographerDetailPage)
