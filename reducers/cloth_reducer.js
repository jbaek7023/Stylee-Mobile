import {
  CLOTHES_LIST_SUCCESS,
  CLOTHES_LIST_FAIL
} from '../actions/types';

const INITIAL_STATE = { clothesList: [] }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLOTHES_LIST_SUCCESS:
      return { ...state,  clothesList: action.payload }
    case CLOTHES_LIST_FAIL:
      return { ...state, }
    default:
      return state;
  }
}
