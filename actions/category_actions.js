import axios from 'axios';

import {
  CATEGORIES_LOAD_SUCCESS,
  CATEGORIES_LOAD_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const fetchUserCategories = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/category/simplelist/`, { headers });
  if (response.status === 200) {
    dispatch({ type: CATEGORIES_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CATEGORIES_LOAD_FAIL })
  }
};
