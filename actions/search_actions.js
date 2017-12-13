import axios from 'axios';

import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const searchFor = (token, hType, text) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.get(`${ROOT_URL}/profile/search/?search=${text}`, {headers});

  if (response.status === 200) {
    dispatch({ type: SEARCH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: SEARCH_FAIL })
  }
}
