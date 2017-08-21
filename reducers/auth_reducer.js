import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN
} from '../actions/types';

const INITIAL_STATE = { token: null, authError: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case AUTH_LOGIN_SUCCESS:
      return { token: action.payload };
    case AUTH_LOGIN_FAIL:
      return { token: null };
    case SET_TOKEN:
      console.log(action.payload);
      return { token: action.payload };
    default:
      return state;
  }
}
