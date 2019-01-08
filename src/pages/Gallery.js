import React, { Fragment, Component  } from 'react';
import ImgFigure from '../components/ImgFigure';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';

let p= [];

  fetch('http://localhost:3000/api/v1/images')
    .then(res=>res.json())
    .then(resJson=>{

        p=resJson

    })


class GalleryImage extends Component {
  constructor(){
    super();
    this.handelClick = this.handelClick.bind(this);
    this.state = {

      photos: [],

    }
  }


  componentDidMount(){
    fetch('http://localhost:3000/api/v1/images')
      .then(res=>res.json())
      .then(resJson=> {
        this.setState({
          photos: resJson,


        })
      })
  }


  handelClick(event){

    let imgId=event.target.id


      let photographerId= p.find(photo=> photo.id ==imgId ).photographer_id
       
      window.location.href = `http://localhost:3001/photographers/${photographerId}`
  }

  photo_srcs(){
    var myArray = [3,4];

    let newarr = this.state.photos

    if(newarr.length > 0){

      let i;

      for(i=0; i<newarr.length; i++){
        newarr[i].src= newarr[i].image_url

        delete newarr[i].created_at
        delete newarr[i].updated_at
        delete newarr[i].photographer
        delete newarr[i].photographer_id
      }


      for(i=0; i<newarr.length; i++){
        newarr[i].width = myArray[Math.floor(Math.random()*myArray.length)]
        newarr[i].height = myArray[Math.floor(Math.random()*myArray.length)]

      }

    }
    return newarr

  }
  render(){
    console.log(p)
    const width = this.state.width
    return(
      <div className="random-show">
      <Gallery photos={this.photo_srcs()} className="cover-g" onClick={this.handelClick} />
      </div>
    )
  }
}
export default GalleryImage;
