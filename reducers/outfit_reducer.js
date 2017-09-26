import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CATEGORY_LIST_LOAD_SUCCESS,
  CATEGORY_LIST_LOAD_FAIL,
  CATEGORY_DETAIL_LOAD_SUCCESS,
  CATEGORY_DETAIL_LOAD_FAIL,
} from '../actions/types';

const INITIAL_STATE = { categories:null, outfits: null, outfitDetail: null, categoryDetail: null }

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
    case CATEGORY_LIST_LOAD_SUCCESS:
     return { ...state, categories: action.payload }
    case CATEGORY_LIST_LOAD_FAIL:
     return { ...state, categories: null }
    case CATEGORY_DETAIL_LOAD_SUCCESS:
     return { ...state, categoryDetail: action.payload }
    case CATEGORY_DETAIL_LOAD_FAIL:
     return { ...state, categoryDetail: null }
    default:
      return state;
  }
}
