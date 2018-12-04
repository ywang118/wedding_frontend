import React from 'react';
import Photographer from './Photographer'
import empty from '../css/assets/empty.png';


const UserPhotographers = (props) => {

    if (props.photographers.length !== 0) {
      return(
        <div className="cols photographer-list">
          {props.photographers.map(photographer => <Photographer key={photographer.id} photographer={photographer} />)}
        </div>
      )
    } else {
      return <img src={empty} alt="this user does not have any upcoming photographers" width="720px" height="400px"/>
    }
}

export default UserPhotographers
