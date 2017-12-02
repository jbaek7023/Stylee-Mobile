import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_DETAIL_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from '../actions/types';

const INITIAL_STATE = { comments: [], replyComment: []}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return { ...state,  comments: action.payload.comments }
    case FETCH_COMMENTS_FAIL:
      return { ...state }
    case COMMENT_DETAIL_SUCCESS:
      return { ...state,  replyComment: action.payload }
    case COMMENT_DETAIL_FAIL:
      return { ...state, }
    case CREATE_COMMENT_SUCCESS:
      console.log(action.payload);
      return { ...state,  addedComment: action.payload }
    case CREATE_COMMENT_FAIL:
      return { ...state, }
    default:
      return state;
  }
}
