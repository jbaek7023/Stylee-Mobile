import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CREATE_STYLE_SUCCESS,
  CREATE_STYLE_FAIL,
  LOAD_NEXT_OUTFIT_SUCCESS,
  LOAD_NEXT_OUTFIT_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  outfits: null,
  outfitDetail: null,
  created: null,
  nextUri: null}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OUTFIT_LOAD_SUCCESS:
      return { ...state,  outfits: action.payload.results, nextUri: action.payload.next }
    case OUTFIT_LOAD_FAIL:
      return { ...state, }
    case LOAD_NEXT_OUTFIT_SUCCESS:
      return { ...state, outfits: state.outfits.concat(action.payload.results), nextUri: action.payload.next }
    case LOAD_NEXT_OUTFIT_FAIL:
      return { ...state, }
    case O_DETAIL_LOAD_SUCCESS:
      return { ...state, outfitDetail: action.payload }
    case O_DETAIL_LOAD_FAIL:
      return { ...state, outfitDetail: null }
    case CREATE_STYLE_SUCCESS:
     return { ...state, created: action.payload.created }
    case CREATE_STYLE_FAIL:
     return { ...state, created: null }
    default:
      return state;
  }
}
