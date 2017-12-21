import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED,
  RETRIEVE_PROFILE_SUCCESS,
  RETRIEVE_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_IMG_SUCCESS,
  EDIT_PROFILE_IMG_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  profile: undefined,
  imageCreated: '',
  bio: '',
  currentUser: undefined,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_CUR_USER:
      return { ...state, currentUser: action.payload[0].user }
    case RETRIEVE_CUR_USER_FAILED:
      return { ...state, username: 'Not Loaded', bio: 'Not Loaded' }
    case RETRIEVE_PROFILE_SUCCESS:
      return { ...state, profile: action.payload }
    case RETRIEVE_PROFILE_FAIL:
      return { ...state, profile: {} }
    case EDIT_PROFILE_SUCCESS:
      return { ...state, }
    case EDIT_PROFILE_FAIL:
      return { ...state, }
    case EDIT_PROFILE_IMG_SUCCESS:
      return { ...state, imageCreated: action.payload.changed}
    case EDIT_PROFILE_IMG_FAIL:
      return { ...state, }
    default:
      return state;
  }
}
