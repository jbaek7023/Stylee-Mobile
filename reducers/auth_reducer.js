import {
  FACEBOOK_LOGIN_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  SET_TOKEN,
  SOCIAL_FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_CANCEL,
  SET_DEFAULT_ALL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FB_AUTH_LOGIN_SUCCESS,
  FB_AUTH_LOGIN_FAIL,
  EMPTY_ERROR_MSG,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from '../actions/types';

const INITIAL_STATE = { token: null, errorMsg: undefined }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_CANCEL:
      return { ...state, token: null, errorMsg: undefined }
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null, errorMsg: 'You are not Online' }
    case FB_AUTH_LOGIN_SUCCESS:
      return { ...state, fbToken: action.payload, errorMsg: undefined, hType: 2}
    case FB_AUTH_LOGIN_FAIL:
      return { ...state, fbToken: null, errorMsg: 'Contact Administrator'}
    case AUTH_LOGIN_SUCCESS:
      return { ...state, token: action.payload, errorMsg: undefined, hType: 1};
    case AUTH_LOGIN_FAIL:
      return { ...state, token: null, errorMsg: `Can't Find Account` };
    case SET_TOKEN:
      return { ...state, token: action.payload.token, hType: action.payload.hType, errorMsg: '' };
    case SET_DEFAULT_ALL:
      return { ...state, token: null, errorMsg: undefined };
    case SOCIAL_FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null, errorMsg: `Can't Login with your Facebook account`}
    case REGISTER_SUCCESS:
      return { ...state, token: action.payload, errorMsg: '', hType: 1 }
    case REGISTER_FAIL:
      return { ...state, token: null, errorMsg: undefined }
    case EMPTY_ERROR_MSG:
      return { ...state, errorMsg: undefined}
    case CHANGE_PASSWORD_SUCCESS:
      //incomplete: we should send data later
      return { ...state }
    case  CHANGE_PASSWORD_FAIL:
      return { ...state }
    default:
      return state;
  }
}
