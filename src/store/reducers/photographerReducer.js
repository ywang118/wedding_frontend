import {FETCH_PHOTOGRAPHERS_SUCCESS,SET_CURRENT_PHOTOGRAPHER} from '../actions/actionTypes';

const initialState = {
  items: [],
  currentPhotographer: {},
};
export default function photographerReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PHOTOGRAPHERS_SUCCESS:
      return {
        ...state,
        items: action.payload.photographers
      };
    case SET_CURRENT_PHOTOGRAPHER:
      return {...state, currentPhotographer: action.payload}

    default:
      return state;
  }
}
