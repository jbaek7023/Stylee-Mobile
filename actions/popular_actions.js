import axios from 'axios';

import {
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const fetchFirstPopularFeed = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.get(`${ROOT_URL}/outfits/popular/`, {headers});

  if (response.status === 200) {
    dispatch({ type: FETCH_POPULAR_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: FETCH_POPULAR_FAIL })
  }
}
