import axios from 'axios';

import {
  RETRIEVE_CUR_USER,
  RETRIEVE_CUR_USER_FAILED,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const retrieveCurrentUser = (token) => dispatch => {
    axios.get(`${ROOT_URL}/profile/detail/`, { headers: {
    'Authorization': `JWT ${token}`
    }
  }).then(response => {
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
//
// export const doAuthLogin = ( username, password ) => dispatch => {
//   axios.post(`${ROOT_URL}/rest-auth/login/`, {
//     username,
//     password,
//   }).then(response => {
//     AsyncStorage.setItem('stylee_token', response.data.token);
//     dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.token });
//   })
//   .catch(response => {
//     if(response.status === 400) {
//       console.log('Not authorized. ');
//     } else if (response.status === 403){
//       console.log('You are not suposed to see this message. Contact Administrator');
//     }
//     dispatch({ type: AUTH_LOGIN_FAIL});
//   });
// };
