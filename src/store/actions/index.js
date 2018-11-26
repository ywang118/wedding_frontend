import {FETCH_PHOTOGRAPHERS_SUCCESS,SET_CURRENT_PHOTOGRAPHER} from './actionTypes';
export const fetchPhotographers=()=>{
  return dispatch => {
    fetch('http://localhost:3000/api/v1/photographers')
      .then(res=> res.json())
      .then(json=>
          dispatch(fetchPhotographersSuccess(json)));

      }
  }


export const setCurrentPhotographer = (photographer) => {
  return {
    type: SET_CURRENT_PHOTOGRAPHER,
    payload: photographer
  }
}



export const fetchPhotographersSuccess = photographers => ({
  type: FETCH_PHOTOGRAPHERS_SUCCESS,
  payload: { photographers }
});
