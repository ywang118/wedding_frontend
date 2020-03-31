import {ADD_ORDER, DELETE_USER_PHOTOGRAPHER,ADD_USER_PHOTOGRAPHER,SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN,UPDATE_PROFILE_PHOTO } from '../actions/actionTypes';

const defaultState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

function userReducer(state=defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN:
      return { ...state, failedLogin: true, error: action.payload, authenticatingUser: false }
    case UPDATE_PROFILE_PHOTO:
      return { ...state, user: {...state.user, avatar: action.payload}}
    case ADD_USER_PHOTOGRAPHER:

      return { ...state, user: {...state.user, photographers: [...state.user.photographers, action.payload.photographer]}}
    case DELETE_USER_PHOTOGRAPHER:
      return { ...state, user: {...state.user, photographers: state.user.photographers.filter(photographer => photographer.id !== action.payload.photographer.id)}}
    case ADD_ORDER:
      return { ...state, user: {...state.user, photographers: [...state.user.photographers, action.payload.photographer]}}
    default:
      return state
  }
}


export default userReducer
