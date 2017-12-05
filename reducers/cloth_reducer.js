import {
  CLOTHES_LIST_SUCCESS,
  CLOTHES_LIST_FAIL,
  C_DETAIL_LOAD_SUCCESS,
  C_DETAIL_LOAD_FAIL,
  CREATE_CLOTH_SUCCESS,
  CREATE_CLOTH_FAIL,
} from '../actions/types';

const INITIAL_STATE = { clothesList: [], clothDetail: null, created: null}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLOTHES_LIST_SUCCESS:
      return { ...state,  clothesList: action.payload }
    case CLOTHES_LIST_FAIL:
      return { ...state, }
    case C_DETAIL_LOAD_SUCCESS:
      return { ...state,  clothDetail: action.payload }
    case C_DETAIL_LOAD_FAIL:
      return { ...state }
    case CREATE_CLOTH_SUCCESS:
      return { ...state, created: action.payload }
    case CREATE_CLOTH_FAIL:
      return { ...state, created: null }
    default:
      return state;
  }
}
