import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CREATE_STYLE_SUCCESS,
  CREATE_STYLE_FAIL,
  LOAD_NEXT_OUTFIT_SUCCESS,
  LOAD_NEXT_OUTFIT_FAIL,
  EDIT_STYLE_SUCCESS,
  EDIT_STYLE_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  outfits: null,
  outfitDetail: null,
  created: null,
  nextUri: null,
  edited: null
}

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
    case EDIT_STYLE_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, edited: timeStamp.toString() }
    case EDIT_STYLE_SUCCESS:
      return { ...state, edited: null }
    default:
      return state;
  }
}
