import { combineReducers } from 'redux';
import auth from './auth_reducer';
import menu from './menu_reducer';
import newAuth from './new_user_reducer';
import outfit from './outfit_reducer';
import wardrobe from './cloth_reducer';
import user from './user_reducer';
import comment from './comment_reducer';
import category from './category_reducer';
import search from './search_reducer';
import popular from './popular_reducer';
import bookmark from './bookmark_reducer';

export default combineReducers({
  auth,
  menu,
  newAuth,
  outfit,
  wardrobe,
  user,
  comment,
  category,
  search,
  popular,
  bookmark
});
