import {
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN,
  SOCIAL_FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_CANCEL,
  SET_DEFAULT_ALL,
} from '../actions/types';

const INITIAL_STATE = { token: null, errorMsg: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_CANCEL:
      return { token: null, errorMsg: '' }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null, errorMsg: 'You are not Online' }
    case AUTH_LOGIN_SUCCESS:
      return { token: action.payload, errorMsg: ''};
    case AUTH_LOGIN_FAIL:
      return { token: null, errorMsg: `Can't Find Account` };
    case SET_TOKEN:
      console.log('passing set token');
      console.log(action.payload);
      return { token: action.payload, errorMsg: '' };
    case SET_DEFAULT_ALL:
      return { token: null, errorMsg: '' };
    case SOCIAL_FACEBOOK_LOGIN_FAIL:
      return { token: null, errorMsg: `Can't Login with your Facebook account`}
    default:
      return state;
  }
}
