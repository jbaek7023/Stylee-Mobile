import { createSelector } from 'reselect';
import _ from 'lodash';

// creates select function to pick off the pieces of states
const colorSelector = state => state.clothColor
const selectedColorsSelector = state => state.selectedColorIds

const getColors = (clothColor, selectedColorIds) => {
  const selectedColors = _.filter(
    clothColor,
    cloth => _.includes(selectedColorIds, cloth.id)
  );
  return selectedColors;
}

export default createSelector(
  colorSelector, //pick off a piece of state
  selectedColorsSelector, //pick off a pice of state
  getColors //last argument is the function that has a logic
);
