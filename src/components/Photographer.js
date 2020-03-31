import React from 'react';
import { withRouter } from "react-router";
import { Button ,Card,Image,Icon} from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';
const Photographer = (props) => {
  const {id, name, avg_rating, about, photo_video, style, shoot_type, price, phone, address, image,user_photographers} = props.photographer
  const showDetails = ()=> {
    props.history.push(`/photographers/${id}`)
  }
  return (

    <div className="styles-product-div" key={id}>
      <div className="product-div">
      <Card>
      <div className="product-images-container">
      <Image src={image} onClick={showDetails} className="product-images"  alt="logo" />
      </div>
      <Card.Content>
      <Card.Header><p className="home-name">{name}</p></Card.Header>
      <Card.Description>${price}.00</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <a>
        <Icon name='like' />
        {user_photographers ? `${user_photographers.length} likes` : null}
      </a>
    </Card.Content>
      </Card>
      </div>
    </div>
  )
}
export default withRouter(Photographer)
