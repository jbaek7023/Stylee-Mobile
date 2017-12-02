import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CATEGORY_LIST_LOAD_SUCCESS,
  CATEGORY_LIST_LOAD_FAIL,
  CATEGORY_DETAIL_LOAD_SUCCESS,
  CATEGORY_DETAIL_LOAD_FAIL,
  STAR_OUTFIT_LOAD_SUCCESS,
  STAR_OUTFIT_LOAD_FAIL,
  LIKE_OUTFIT_SUCCESS,
  LIKE_OUTFIT_FAIL,
  UNLIKE_OUTFIT_SUCCESS,
  UNLIKE_OUTFIT_FAIL,
  BOOKMARK_OUTFIT_SUCCESS,
  BOOKMARK_OUTFIT_FAIL,
  UNBOOKMARK_OUTFIT_SUCCESS,
  UNBOOKMARK_OUTFIT_FAIL,
} from '../actions/types';

const INITIAL_STATE = { categories:null, outfits: null, outfitDetail: null, categoryDetail: null, starOutfits: null }

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
    case STAR_OUTFIT_LOAD_SUCCESS:
     return { ...state, starOutfits: action.payload }
    case STAR_OUTFIT_LOAD_FAIL:
     return { ...state, starOutfits: null }

    //  I assume like or bookmark can't be failed on the server side.
    // we don't care about the edge case
    case LIKE_OUTFIT_SUCCESS:
      return { ...state }
    case LIKE_OUTFIT_FAIL:
      return { ...state }
    case UNLIKE_OUTFIT_SUCCESS:
     return { ...state }
    case UNLIKE_OUTFIT_FAIL:
     return { ...state }
    case BOOKMARK_OUTFIT_SUCCESS:
      return { ...state }
    case BOOKMARK_OUTFIT_FAIL:
      return { ...state }
    case UNBOOKMARK_OUTFIT_SUCCESS:
      return { ...state }
    case UNBOOKMARK_OUTFIT_FAIL:
       return { ...state }
    default:
      return state;
  }
}
