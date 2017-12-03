import axios from 'axios';

import {
  CATEGORIES_LOAD_SUCCESS,
  CATEGORIES_LOAD_FAIL,
  OUTFIT_CATEGORIES_LOAD_SUCCESS,
  OUTFIT_CATEGORIES_LOAD_FAIL,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  ADD_TO_CATEGORY_SUCCESS,
  ADD_TO_CATEGORY_FAIL,
  DELTE_FROM_CATEGORY_SUCCESS,
  DELTE_FROM_CATEGORY_FAIL,
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

export const fetchOutfitCategories = (token, hType, oid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/outfits/catelist/${oid}/`, { headers });
  if (response.status === 200) {
    dispatch({ type: OUTFIT_CATEGORIES_LOAD_SUCCESS, payload: response.data.categories })
  } else {
    dispatch({ type: OUTFIT_CATEGORIES_LOAD_FAIL })
  }
};

export const addToCategory = (token, hType, oid, categoryId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/outfits/addto/`, {
    outfit_id: oid,
    category_id: categoryId
  }, {headers});
  if (response.status === 201) {
    dispatch({ type: ADD_TO_CATEGORY_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: ADD_TO_CATEGORY_FAIL })
  }
};
export const deleteFromCategory = (token, hType, oid, categoryId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/outfits/deletefrom/`, {
    outfit_id: oid,
    category_id: categoryId
  }, {headers});
  if (response.status === 200) {
    dispatch({ type: DELTE_FROM_CATEGORY_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: DELTE_FROM_CATEGORY_FAIL })
  }
};

export const createNewCategory = (token, hType, oid, title, onlyMe) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.post(`${ROOT_URL}/category/create/`, {
    outfit_id: oid,
    name: title,
    only_me: onlyMe
  }, {headers});
  if (response.status === 201) {
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CREATE_CATEGORY_FAIL })
  }
};
