import React,{ Component }  from 'react';
import {connect} from 'react-redux';
import {fetchPhotographers} from "../store/actions/index";
import Photographer from './Photographer'
class PhotographerContainer extends Component {
  componentDidMount(){
    this.props.dispatch(fetchPhotographers())
  }
  render(){

    return (
        <div className="wrapper event-list">
            <h1 className="photographer-header">Photographers</h1>
            <div id="photographers-container">
              {this.props.photographers.map(photographer => <Photographer key={photographer.id} photographer={photographer} />)}
            </div>
         </div>
      )
  }

}
const mapStateToProps = state => ({
  photographers: state.photographerReducer.items,

});

export default connect(mapStateToProps)(PhotographerContainer);
