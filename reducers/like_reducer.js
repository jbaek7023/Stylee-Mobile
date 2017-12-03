import {
  LIKE_CLOTH_SUCCESS,
  LIKE_CLOTH_FAIL,
  UNLIKE_CLOTH_SUCCESS,
  UNLIKE_CLOTH_FAIL,
} from '../actions/types';

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
    default:
      return state;
  }
}
