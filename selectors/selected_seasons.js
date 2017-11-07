import { createSelector } from 'reselect';
import _ from 'lodash';

// creates select function to pick off the pieces of states
const seasonsSelector = state => state.seasons
const selectedSeasonsSelector = state => state.selectedSeasonIds

// seasons  = {30: 'Fall', 31: 'Spring', 32: 'All'}
// selectedSeasonIds = {30: true, 31: false, 32: true}

// selectedSeasons = {30: 'Fall', 32: 'All'}

const getSeasons = (seasons, selectedSeasonIds) => {

  const selectedSeasons = _.filter(
    seasons,
    season => _.includes(selectedSeasonIds, season.id)
  );
  return selectedSeasons;
}

export default createSelector(
  seasonsSelector, //pick off a piece of state
  selectedSeasonsSelector, //pick off a pice of state
  getSeasons //last argument is the function that has a logic
);
