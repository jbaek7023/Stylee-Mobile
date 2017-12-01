import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
}  from '../actions/types';

const INITIAL_STATE = { cUserProfile: null }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PAGE_FETCH_SUCCESS:
      return { ...state, cUserProfile: action.payload }
    case USER_PAGE_FETCH_FAIL:
      return { ...state, token: null, errorMsg: 'You are not Online' }
    case USER_FOLLOW_SUCCESS:
      return { ...state }
    case USER_FOLLOW_FAIL:
      return { ...state }
    case USER_UNFOLLOW_SUCCESS:
      return { ...state }
    case USER_UNFOLLOW_FAIL:
      return { ...state }
    default:
      return state;
  }
}
