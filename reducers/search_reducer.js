import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../actions/types';

const INITIAL_STATE = { result: []}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state,  result: action.payload }
    case SEARCH_FAIL:
      return { ...state }
    default:
      return state;
  }
}
