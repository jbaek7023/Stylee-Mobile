import {
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN
} from '../actions/types';

const INITIAL_STATE = { token: null, authError: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_FAIL:
      return { token: null, errorMsg: '' }
    case AUTH_LOGIN_SUCCESS:
      return { token: action.payload, errorMsg: ''};
    case AUTH_LOGIN_FAIL:
      return { token: null, errorMsg: 'Could not log in with your provided cridential' };
    case SET_TOKEN:
      return { token: action.payload, errorMsg: '' };
    default:
      return state;
  }
}
