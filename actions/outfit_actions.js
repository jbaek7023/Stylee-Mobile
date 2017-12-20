import axios from 'axios';

import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CATEGORY_DETAIL_LOAD_SUCCESS,
  CATEGORY_DETAIL_LOAD_FAIL,
  CREATE_STYLE_SUCCESS,
  CREATE_STYLE_FAIL,
  LOAD_NEXT_OUTFIT_SUCCESS,
  LOAD_NEXT_OUTFIT_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const createStyle = (token, hType, styleObject) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let { name, base64, gender, location, description,
  selectedClothesIds, taggedClothes, taggedCategories, onlyMe, link } = styleObject;

  let response = await axios.post(`${ROOT_URL}/outfits/create/`, {
    name, base64, gender, location, description,
    selectedClothesIds, taggedClothes, taggedCategories, onlyMe
  }, {headers});

  if(response.data) {
    dispatch({ type: CREATE_STYLE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CREATE_STYLE_FAIL })
  }
}

// Getting dispatch as a parameter because we want to access to the dispatch from the parent function
export const loadOutfitAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/outfits/list/`, { headers });
  if (response.status === 200) {
    dispatch({ type: OUTFIT_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: OUTFIT_LOAD_FAIL })
  }
};

export const loadOutfitNextAll = (token, hType, nextUri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/outfits/list/`, { headers });
  if (response.status === 200) {
    dispatch({ type: LOAD_NEXT_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: LOAD_NEXT_OUTFIT_FAIL })
  }
};

export const fetchOutfitDetail = (token, hType, id) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/outfits/detail/${id}`, { headers });
  if (response.status === 200) {
    dispatch({ type: O_DETAIL_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: O_DETAIL_LOAD_FAIL })
  }
}

export const fetchCategoryDetail = (token, hType, id) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/category/detail/${id}`, { headers });
  if (response.status === 200) {
    dispatch({ type: CATEGORY_DETAIL_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CATEGORY_DETAIL_LOAD_FAIL })
  }
}
