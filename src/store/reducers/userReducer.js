import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, UPDATE_BIO, ADD_USER_EVENT, DELETE_USER_EVENT, SAVE_USER_TUTORIAL, UPDATE_PROFILE_PHOTO } from '../actions/actionTypes';

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
    case UPDATE_BIO:
      return { ...state, user: {...state.user, bio: action.payload}}
    case UPDATE_PROFILE_PHOTO:
      return { ...state, user: {...state.user, avatar: action.payload}}
    case ADD_USER_EVENT:
      return { ...state, user: {...state.user, events: [...state.user.events, action.payload.event]}}
    case DELETE_USER_EVENT:
      return { ...state, user: {...state.user, events: state.user.events.filter(event => event.id !== action.payload.event.id)}}
    case SAVE_USER_TUTORIAL:
      return { ...state, user: {...state.user, tutorials: [...state.user.tutorials, action.payload]}}
    default:
      return state
  }
}


export default userReducer
