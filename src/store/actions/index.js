import {FETCH_PHOTOGRAPHERS_SUCCESS,SET_CURRENT_PHOTOGRAPHER,SET_CURRENT_USER, AUTHENTICATING_USER,FAILED_LOGIN} from './actionTypes';
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

export const loginUser =(username, password) => {
  return (dispatch)=> {
    dispatch({type: AUTHENTICATING_USER})
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       user: {
         username,
         password
       }
     })
    })
      .then(res=> {
        if (!res.ok){
          throw res
        }
        return res.json()
      })
      .then(resjson=> {
        localStorage.setItem('jwt', resjson.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: resjson.user})
      })
      .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))
  }
}
