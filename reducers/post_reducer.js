import {
  SELECT_SEASON
} from '../actions/types';

const INITIAL_STATE = { seasons: [] }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_SEASON:
      seasons.push(action.payload)
      return { ...state, seasons }
    default:
      return state;
  }
}
