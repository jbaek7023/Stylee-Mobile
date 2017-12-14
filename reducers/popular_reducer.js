import {
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAIL,
} from '../actions/types';

const INITIAL_STATE = { result: []}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POPULAR_SUCCESS:
      return { ...state,  page: action.payload }
    case FETCH_POPULAR_FAIL:
      return { ...state }
    default:
      return state;
  }
}
