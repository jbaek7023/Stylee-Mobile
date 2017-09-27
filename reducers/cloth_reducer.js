import {
  CLOTHES_LIST_SUCCESS,
  CLOTHES_LIST_FAIL,
  C_DETAIL_LOAD_SUCCESS,
  C_DETAIL_LOAD_FAIL
} from '../actions/types';

const INITIAL_STATE = { clothesList: [], clothDetail: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLOTHES_LIST_SUCCESS:
      console.log('hello clothes_list');
      console.log(action.payload);
      return { ...state,  clothesList: action.payload }
    case CLOTHES_LIST_FAIL:
      return { ...state, }
    case C_DETAIL_LOAD_SUCCESS:
      return { ...state,  clothDetail: action.payload }
    case C_DETAIL_LOAD_FAIL:
      return { ...state }
    default:
      return state;
  }
}
