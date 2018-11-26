import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popup, Icon } from 'semantic-ui-react';
import {setCurrentPhotographer} from '../store/actions/index';
import Slider from 'react-slick';
class PhotographerDetailPage extends Component {

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/photographers/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(photographer => {
      this.props.setCurrentPhotographer(photographer)
    })
  }

  render(){
    const {photographer} = this.props
    console.log(photographer)
    return (
      <Fragment>
        <div> slicker slide</div>
        <div> photographer Detail</div>
      </Fragment>
    )

  }
}
const mapStateToProps = state => ({

  photographer: state.photographerReducer.currentPhotographer
})

export default connect(mapStateToProps, { setCurrentPhotographer})(PhotographerDetailPage)
