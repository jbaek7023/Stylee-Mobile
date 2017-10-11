import { combineReducers } from 'redux';
import auth from './auth_reducer';
import menu from './menu_reducer';
import newAuth from './new_user_reducer';
import outfit from './outfit_reducer';
import wardrobe from './cloth_reducer';
import user from './user_reducer';

export default combineReducers({
  auth,
  menu,
  newAuth,
  outfit,
  wardrobe,
  user,
});
