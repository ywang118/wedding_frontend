import React, { Fragment, Component  }  from 'react';
class ImgFigure extends Component {
  render(){
    console.log(this.props.arrange)
    let styleObj = {};
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }



    return(
      <figure className="img-figure-g" style={styleObj}>
        <img src={this.props.img.image_url} />
        <figcaption>
          <h2 className="img-title-g">{this.props.img.photographer.name}</h2>
        </figcaption>
      </figure>
    )
  }
}
export default ImgFigure;
