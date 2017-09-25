import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL
} from '../actions/types';

const INITIAL_STATE = { outfits: null, outfitDetail: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OUTFIT_LOAD_SUCCESS:
      return { ...state,  outfits: action.payload }
    case OUTFIT_LOAD_FAIL:
      return { ...state, }
    case O_DETAIL_LOAD_SUCCESS:
      return { ...state, outfitDetail: action.payload }
    case O_DETAIL_LOAD_FAIL:
      return { ...state, outfitDetail: null }
    default:
      return state;
  }
}
