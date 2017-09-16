import axios from 'axios';

import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const retrieveCurrentUser = (token, hType) => dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  console.log('in retrieve header type');
  console.log(hType);
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  axios.get(`${ROOT_URL}/profile/detail/`, { headers }).then(response => {
    dispatch({ type: RETRIEVE_CUR_USER, payload: response.data });
  })
  .catch(response => {
    if(response.status === 401) {
      // Authorization Token has been expired
    } else if (response.status === 403){
      console.log('You are not suposed to see this message. Contact Administrator');
    }
    dispatch({ type: RETRIEVE_CUR_USER_FAILED });
  });
}
