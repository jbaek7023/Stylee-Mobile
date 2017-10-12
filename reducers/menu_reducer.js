import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from '../actions/types';

const INITIAL_STATE = { username: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_CUR_USER:
      return { currentUser: action.payload[0].user }
    case RETRIEVE_CUR_USER_FAILED:
      return { username: 'Not Loaded', bio: 'Not Loaded' }
    case EDIT_PROFILE_SUCCESS:
      return { profile: action.payload }
    case EDIT_PROFILE_FAIL:
      return { profile: {} }
    default:
      return state;
  }
}
