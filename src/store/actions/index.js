import {ADD_ORDER, DELETE_USER_PHOTOGRAPHER,ADD_USER_PHOTOGRAPHER,FETCH_PHOTOGRAPHERS_SUCCESS,SET_CURRENT_PHOTOGRAPHER,SET_CURRENT_USER, AUTHENTICATING_USER,FAILED_LOGIN, UPDATE_PROFILE_PHOTO} from './actionTypes';
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
export const addOrder = (photographer,user,date)=> {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/orders',{
      method: "POST",
      headers: {
        "Accept": 'application/json',
         "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        order: {
          photographer_id: photographer.id,
          user_id: user.id,
          date: date
        }
      })
    })
    .then(res=> res.json())
    .then(order => {
      dispatch({type: ADD_ORDER, payload: {order,photographer,user}})
    })
  }
}
export const updateProfilePhoto = (userId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', "vfxbu1dt");
  return dispatch => {
    fetch('https://api.cloudinary.com/v1_1/dumkk6jbh/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      updateBackendProfile(userId, data.secure_url)
      dispatch({type: UPDATE_PROFILE_PHOTO, payload: data.secure_url})
    })

  }
}

export const updateBackendProfile = (userId, avatarUrl) => {
  fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  // .then(response => response.json())
  // .then(console.log)
}
export const fetchCurrentUser = () => {
  // console.log("About to do stuff")
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
export const deleteUserPhotographer=(userPhotographer, photographer, user) => {

  return dispatch => {
    fetch(`http://localhost:3000/api/v1/user_photographers/${userPhotographer.id}`,{
      method:'DELETE'
    })
    .then(res=> res.json())
    .then(userPhotographer=>{
      dispatch({ type:DELETE_USER_PHOTOGRAPHER, payload: {userPhotographer, photographer, user}})
    })
  }
}
export const addUserPhotographer = (photographer, user) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/user_photographers',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_photographer: {
          photographer_id: photographer.id,
          user_id: user.id
        }
      })
    })
    .then(res=>res.json())
    .then(resJson => {
      console.log(resJson)
      dispatch({type: ADD_USER_PHOTOGRAPHER, payload: {resJson, photographer, user}})
    })
  }
}
export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const createComment=(values,photographerId, userId,redirectCb)=>{
  fetch('http://localhost:3000/api/v1/comments',{
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      comment: {
        description: values.description,
        date: values.date,
        photographer_id: photographerId,
        user_id: userId
      }
    })
  })
  .then(res=> res.json())
  .then(comment=> {

    redirectCb(`/photographers/${photographerId}`)
  })
}

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
