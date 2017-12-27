import {
  C_DETAIL_LOAD_SUCCESS,
  C_DETAIL_LOAD_FAIL,
  CREATE_CLOTH_SUCCESS,
  CREATE_CLOTH_FAIL,
  UPDATE_CLOTH_SUCCESS,
  UPDATE_CLOTH_FAIL,
  DELETE_CLOTH_SUCCESS,
  DELETE_CLOTH_FAIL,

  FETCH_TOP_LIST_SUCCESS,
  FETCH_TOP_LIST_FAIL,
  FETCH_OUTERWEAR_LIST_SUCCESS,
  FETCH_OUTERWEAR_LIST_FAIL,
  FETCH_BOTTOM_LIST_SUCCESS,
  FETCH_BOTTOM_LIST_FAIL,
  FETCH_SHOES_LIST_SUCCESS,
  FETCH_SHOES_LIST_FAIL,
  FETCH_ETC_LIST_SUCCESS,
  FETCH_ETC_LIST_FAIL,

  FETCH_NEXT_TOP_SUCCESS,
  FETCH_NEXT_TOP_FAIL,
  FETCH_NEXT_OUTERWEAR_SUCCESS,
  FETCH_NEXT_OUTERWEAR_FAIL,
  FETCH_NEXT_BOTTOM_SUCCESS,
  FETCH_NEXT_BOTTOM_FAIL,
  FETCH_NEXT_SHOES_SUCCESS,
  FETCH_NEXT_SHOES_FAIL,
  FETCH_NEXT_ETCS_SUCCESS,
  FETCH_NEXT_ETCS_FAIL,

} from '../actions/types';

const INITIAL_STATE = {
  tops: [],
  outerwears: [],
  bottoms: [],
  shoes: [],
  etcs: [],
  topNextUri: null,
  outerwearNextUri: null,
  bottomNextUri: null,
  shoesNextUri: null,
  etcsNextUri: null,
  clothDetail: null,
  created: null,
  deleted: null,
  deletedBigType: null,
  updated: null,
  updatedBigType: null
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TOP_LIST_SUCCESS:
      return { ...state,  tops: action.payload.results, topNextUri: action.payload.next }
    case FETCH_TOP_LIST_FAIL:
      return { ...state, }
    case FETCH_OUTERWEAR_LIST_SUCCESS:
      return { ...state,  outerwears: action.payload.results, outerwearNextUri: action.payload.next }
    case FETCH_OUTERWEAR_LIST_FAIL:
      return { ...state, }
    case FETCH_BOTTOM_LIST_SUCCESS:
      return { ...state,  bottoms: action.payload.results, bottomNextUri: action.payload.next }
    case FETCH_BOTTOM_LIST_FAIL:
      return { ...state, }
    case FETCH_SHOES_LIST_SUCCESS:
      return { ...state,  shoes: action.payload.results, shoesNextUri: action.payload.next }
    case FETCH_SHOES_LIST_FAIL:
      return { ...state, }
    case FETCH_ETC_LIST_SUCCESS:
      return { ...state,  etcs: action.payload.results, etcsNextUri: action.payload.next }
    case FETCH_ETC_LIST_FAIL:
      return { ...state, }
    case C_DETAIL_LOAD_SUCCESS:
      return { ...state,  clothDetail: action.payload }
    case C_DETAIL_LOAD_FAIL:
      return { ...state }
    case CREATE_CLOTH_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, created: timeStamp.toString(), createdBigType: action.payload }
    case CREATE_CLOTH_FAIL:
      return { ...state, created: null }
    case UPDATE_CLOTH_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, updated: timeStamp.toString(), updatedBigType: action.payload}
    case UPDATE_CLOTH_FAIL:
      return { ...state, updated: null }
    case DELETE_CLOTH_SUCCESS:
      var timeStamp = Math.floor(Date.now());
      return { ...state, deleted: timeStamp.toString(), deletedBigType: action.payload }
    case DELETE_CLOTH_FAIL:
      return { ...state }
    default:
      return state;
  }
}
