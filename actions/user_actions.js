import axios from 'axios';

import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const fetchMyProfile = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/profile/pageid/${userPk}`, { headers });
  if (response.status === 200) {
    dispatch({ type: USER_PAGE_FETCH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_PAGE_FETCH_FAIL })
  }
}
