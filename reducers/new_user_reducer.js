import {
  NETWORK_ERROR,
  ADD_VALID_EMAIL,
  ADD_BIO_AND_PASSWORD,
  ADD_USERNAME,
  ADD_VALID_USERNAME,

} from '../actions/types';

const INITIAL_STATE = { email: '', password: '', username: '', bio: '', obtained: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_VALID_EMAIL:
      // payload: user.username, user.obtained
      return { ...state, username: action.payload.username, obtained: action.payload.obtained, email: action.payload.email }
    case ADD_BIO_AND_PASSWORD:
      return { ...state, bio: action.payload.fullname, password: action.payload.password }
    case ADD_VALID_USERNAME:
      // always it returns username.
      return { ...state, username: action.payload.username}
    case NETWORK_ERROR:
      return { username: 'Not Loaded', bio: 'Not Loaded' }
    default:
      return state;
  }
}
