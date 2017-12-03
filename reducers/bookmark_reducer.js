import {
  BOOKMARK_CLOTH_SUCCESS,
  BOOKMARK_CLOTH_FAIL,
  UNBOOKMARK_CLOTH_SUCCESS,
  UNBOOKMARK_CLOTH_FAIL,
} from '../actions/types';

const INITIAL_STATE = { }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOKMARK_CLOTH_SUCCESS:
      return { ...state }
    case BOOKMARK_CLOTH_FAIL:
      return { ...state  }
    case UNBOOKMARK_CLOTH_SUCCESS:
      return { ...state }
    case UNBOOKMARK_CLOTH_FAIL:
      return { ...state }
    default:
      return state;
  }
}
