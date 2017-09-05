import { combineReducers } from 'redux';
import auth from './auth_reducer';
import menu from './menu_reducer';
export default combineReducers({
  auth,
  menu
});
