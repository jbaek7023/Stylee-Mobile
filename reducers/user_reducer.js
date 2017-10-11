import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = { cUserProfile: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PAGE_FETCH_SUCCESS:
      return { ...state, cUserProfile: action.payload }
    case USER_PAGE_FETCH_FAIL:
      return { ...state, token: null, errorMsg: 'You are not Online' }
    default:
      return state;
  }
}
