import {
  CATEGORIES_LOAD_SUCCESS,
  CATEGORIES_LOAD_FAIL,
} from '../actions/types';

const INITIAL_STATE = { list: [] }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATEGORIES_LOAD_SUCCESS:
      return { ...state, list: action.payload }
    case CATEGORIES_LOAD_FAIL:
      return { ...state, }
    default:
      return state;
  }
}
