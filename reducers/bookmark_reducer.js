import {
  BOOKMARK_CLOTH_SUCCESS,
  BOOKMARK_CLOTH_FAIL,
  UNBOOKMARK_CLOTH_SUCCESS,
  UNBOOKMARK_CLOTH_FAIL,
  BOOKMARK_OUTFIT_SUCCESS,
  BOOKMARK_OUTFIT_FAIL,
  UNBOOKMARK_OUTFIT_SUCCESS,
  UNBOOKMARK_OUTFIT_FAIL,
  STAR_OUTFIT_LOAD_SUCCESS,
  STAR_OUTFIT_LOAD_FAIL,
} from '../actions/types';

const INITIAL_STATE = { bookmarked: '', starOutfits: null,}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOKMARK_CLOTH_SUCCESS:
      return { ...state }
    case BOOKMARK_CLOTH_FAIL:
      return { ...state  }
    case UNBOOKMARK_CLOTH_SUCCESS:
      return { ...state }
    case UNBOOKMARK_CLOTH_FAIL:
      return { ...state }
    case BOOKMARK_OUTFIT_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, bookmarked: timeStamp.toString() }
    case BOOKMARK_OUTFIT_FAIL:
      return { ...state }
    case UNBOOKMARK_OUTFIT_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, bookmarked: timeStamp.toString() }
    case UNBOOKMARK_OUTFIT_FAIL:
       return { ...state }
    case STAR_OUTFIT_LOAD_SUCCESS:
      return { ...state, starOutfits: action.payload.results, nextUri: action.payload.next }
    case STAR_OUTFIT_LOAD_FAIL:
      return { ...state, starOutfits: null }
    default:
      return state;
  }
}
