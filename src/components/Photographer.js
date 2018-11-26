import React from 'react';
import { withRouter } from "react-router";
import { Button } from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';
const Photographer = (props) => {
  const {id, name, avg_rating, about, photo_video, style, shoot_type, price, phone, address, image} = props.photographer
  const showDetails = ()=> {
    props.history.push(`/photographers/${id}`)
  }
  return (

    <div className="product-div" key={id}>
      <img src={image} onClick={showDetails} className="product-images" alt="logo" />
      <p className="home-name">{name}</p>

      <StarRatingComponent
          name="rate1"
          starCount={5}
          value={avg_rating}
        />

    </div>
  )
}
export default withRouter(Photographer)
