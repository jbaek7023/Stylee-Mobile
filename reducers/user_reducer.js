import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_PAGE_NEXT_FETCH_SUCCESS,
  USER_PAGE_NEXT_FETCH_FAIL,
}  from '../actions/types';

const INITIAL_STATE = { cUserProfile: null, nextUri: null, token: null, errorMsg: undefined }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PAGE_FETCH_SUCCESS:
      if(action.payload.outfits.length==12) {
        let userId = action.payload.id;
        return { ...state, cUserProfile: action.payload, nextUri: 1 }
      }
      return { ...state, cUserProfile: action.payload }
    case USER_PAGE_FETCH_FAIL:
      return { ...state, token: null, errorMsg: 'You are not Online' }
    case USER_PAGE_NEXT_FETCH_SUCCESS:

      return {
        ...state,
        cUserProfile: {
          ...state.cUserProfile,
          outfits: state.cUserProfile.outfits.concat(action.payload.results)
        },
        nextUri: action.payload.next
      }
    case USER_PAGE_NEXT_FETCH_FAIL:
      return { ...state }
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
