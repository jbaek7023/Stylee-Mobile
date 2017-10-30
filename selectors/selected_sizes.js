import { createSelector } from 'reselect';
import _ from 'lodash';

// creates select function to pick off the pieces of states
const sizeSelector = state => state.clothSize
const selectedSizesSelector = state => state.selectedSizeIds

const getSizes = (clothSize, selectedSizeIds) => {

  const selectedSizes = _.filter(
    clothSize,
    cloth => _.includes(selectedSizeIds, cloth.id)
  );
  return selectedSizes;
}

export default createSelector(
  sizeSelector, //pick off a piece of state
  selectedSizesSelector, //pick off a pice of state
  getSizes //last argument is the function that has a logic
);
