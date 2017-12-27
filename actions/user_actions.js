import axios from 'axios';

import {
  USER_PAGE_FETCH_SUCCESS,
  USER_PAGE_FETCH_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_PAGE_NEXT_STYLE_SUCCESS,
  USER_PAGE_NEXT_STYLE_FAIL,
  USER_PAGE_NEXT_FETCH_SUCCESS,
  USER_PAGE_NEXT_FETCH_FAIL,
  // Categories
  FETCH_USER_CATEGORIES_BY_USER_ID_SUCCESS,
  FETCH_USER_CATEGORIES_BY_USER_ID_FAIL,
  FETCH_NEXT_CATEGORIES_BY_USER_ID_SUCCESS,
  FETCH_NEXT_CATEGORIES_BY_USER_ID_FAIL,
  // wardrobe
  FETCH_USER_TOP_BY_USER_ID_SUCCESS,
  FETCH_USER_TOP_BY_USER_ID_FAIL,
  FETCH_NEXT_TOP_BY_USER_ID_SUCCESS,
  FETCH_NEXT_TOP_BY_USER_ID_FAIL,
  FETCH_USER_OUTERWEAR_BY_USER_ID_SUCCESS,
  FETCH_USER_OUTERWEAR_BY_USER_ID_FAIL,
  FETCH_NEXT_OUTERWEAR_BY_USER_ID_SUCCESS,
  FETCH_NEXT_OUTERWEAR_BY_USER_ID_FAIL,
  FETCH_USER_BOTTOM_BY_USER_ID_SUCCESS,
  FETCH_USER_BOTTOM_BY_USER_ID_FAIL,
  FETCH_NEXT_BOTTOM_BY_USER_ID_SUCCESS,
  FETCH_NEXT_BOTTOM_BY_USER_ID_FAIL,
  FETCH_USER_SHOES_BY_USER_ID_SUCCESS,
  FETCH_USER_SHOES_BY_USER_ID_FAIL,
  FETCH_NEXT_SHOES_BY_USER_ID_SUCCESS,
  FETCH_NEXT_SHOES_BY_USER_ID_FAIL,
  FETCH_USER_ETCS_BY_USER_ID_SUCCESS,
  FETCH_USER_ETCS_BY_USER_ID_FAIL,
  FETCH_NEXT_ETCS_BY_USER_ID_SUCCESS,
  FETCH_NEXT_ETCS_BY_USER_ID_FAIL,
  // follower
  FETCH_USER_FOLLOWER_BY_USER_ID_SUCCESS,
  FETCH_USER_FOLLOWER_BY_USER_ID_FAIL,
  FETCH_NEXT_FOLLOWER_BY_USER_ID_SUCCESS,
  FETCH_NEXT_FOLLOWER_BY_USER_ID_FAIL,
  //following
  FETCH_USER_FOLLOWING_BY_USER_ID_SUCCESS,
  FETCH_USER_FOLLOWING_BY_USER_ID_FAIL,
  FETCH_NEXT_FOLLOWING_BY_USER_ID_SUCCESS,
  FETCH_NEXT_FOLLOWING_BY_USER_ID_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const fetchMyProfile = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }


  let response = await axios.get(`${ROOT_URL}/profile/pageid/${userPk}/?page=1`, { headers });
  if (response.status === 200) {
    dispatch({ type: USER_PAGE_FETCH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_PAGE_FETCH_FAIL })
  }
}

export const retrieveFollowersByUser = (token, hType, userPk, callback, callback2) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(`${ROOT_URL}/follows/follower/${userPk}/?page=1`, { headers });
    callback(response.data.results, response.data.next);
  } catch(e) {
    callback2();
  }
}

export const retrieveFollowingsByUser = (token, hType, userPk, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(`${ROOT_URL}/follows/following/${userPk}/?page=1`, { headers });
    callback(response.data.results, response.data.next);
  } catch(e) {
    console.error(e);
  }
}

export const retrieveNextFollowByUser = (token, hType, nextUri, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(nextUri, { headers });
    callback(response.data.results, response.data.next);
  } catch(e) {
    console.error(e);
  }
}

export const fetchNextProfileOutfits = (token, hType, userPk, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  if(uri==1) {
    uri = `${ROOT_URL}/outfits/next/${userPk}/?page=2`
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: USER_PAGE_NEXT_FETCH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_PAGE_NEXT_FETCH_FAIL })
  }
}

export const fetchUserCategoriesById = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }


  let response = await axios.get(`${ROOT_URL}/category/catelist/${userPk}/?page=1`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_USER_CATEGORIES_BY_USER_ID_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: FETCH_USER_CATEGORIES_BY_USER_ID_FAIL })
  }
}

export const fetchUserNextCategoriesById = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_CATEGORIES_BY_USER_ID_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: FETCH_NEXT_CATEGORIES_BY_USER_ID_FAIL })
  }
}

export const fetchUserTopAll = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/clothlist/${userPk}/1/?page=1`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_USER_TOP_BY_USER_ID_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: FETCH_USER_TOP_BY_USER_ID_FAIL })
  }
}

export const fetchUserTopNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_TOP_BY_USER_ID_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: FETCH_NEXT_TOP_BY_USER_ID_FAIL })
  }
}

export const follow = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/follows/follow/`, {
    user_id: userPk
  }, {headers});

  if (response.status === 200) {
    dispatch({ type: USER_FOLLOW_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_FOLLOW_FAIL })
  }
}

export const unfollow = (token, hType, userPk) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/follows/unfollow/`, {
    user_id: userPk
  }, {headers});

  if (response.status === 200) {
    dispatch({ type: USER_UNFOLLOW_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: USER_UNFOLLOW_FAIL })
  }
}
