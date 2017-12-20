import {
  LIKE_CLOTH_SUCCESS,
  LIKE_CLOTH_FAIL,
  UNLIKE_CLOTH_SUCCESS,
  UNLIKE_CLOTH_FAIL,
  LIKE_OUTFIT_SUCCESS,
  LIKE_OUTFIT_FAIL,
  UNLIKE_OUTFIT_SUCCESS,
  UNLIKE_OUTFIT_FAIL,
} from '../actions/types';

//  I assume like or bookmark can't be failed on the server side.
// we don't care about the edge case
const INITIAL_STATE = { }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIKE_CLOTH_SUCCESS:
      return { ...state }
    case LIKE_CLOTH_FAIL:
      return { ...state  }
    case UNLIKE_CLOTH_SUCCESS:
      return { ...state }
    case UNLIKE_CLOTH_FAIL:
      return { ...state }
    case LIKE_OUTFIT_SUCCESS:
      return { ...state }
    case LIKE_OUTFIT_FAIL:
      return { ...state }
    case UNLIKE_OUTFIT_SUCCESS:
     return { ...state }
    case UNLIKE_OUTFIT_FAIL:
     return { ...state }
    default:
      return state;
  }
}
