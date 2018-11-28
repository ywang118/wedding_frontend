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
    dispatch({type:AUTHENTICATING_USER})
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
export const signupUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })
    fetch(`http://localhost:3000/api/v1/users`, {
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
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    /* { user:
     { username: 'chandler bing', bio: '', avatar: '' },
     jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
     } */
    .then(data => {
      localStorage.setItem('jwt', data.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: data.user })
    })
    .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message }))
    )
  }
}

export const fetchCurrentUser = () => {
  console.log("About to do stuff")
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER }) //tells the app we are fetching
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) =>{

      dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })}
    )
  }
}


export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
