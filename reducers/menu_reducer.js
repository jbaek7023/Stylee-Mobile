import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED
} from '../actions/types';

const INITIAL_STATE = { username: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_CUR_USER:
      return { username: action.payload[0].username, bio: action.payload[0].bio }
    case RETRIEVE_CUR_USER_FAILED:
      return { username: 'Not Loaded', bio: 'Not Loaded' }
    default:
      return state;
  }
}
