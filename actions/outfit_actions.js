import axios from 'axios';

import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CREATE_STYLE_SUCCESS,
  CREATE_STYLE_FAIL,
  LOAD_NEXT_OUTFIT_SUCCESS,
  LOAD_NEXT_OUTFIT_FAIL,
  EDIT_STYLE_SUCCESS,
  EDIT_STYLE_FAIL,
  DELETE_STYLE_SUCCESS,
  DELETE_STYLE_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const createStyle = (token, hType, styleObject, callback) => async dispatch => {
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
  callback();
  if(response.data) {
    dispatch({ type: CREATE_STYLE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CREATE_STYLE_FAIL })
  }
}

export const editStyle = (token, hType, styleObject) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let { id, name, gender, location, description,
  selectedClothesIds, taggedClothes, onlyMe, link } = styleObject;

  let response = await axios.put(`${ROOT_URL}/outfits/update/`, {
    oid:id, name, gender, location, description,
    selectedClothesIds, taggedClothes, onlyMe, link
  }, {headers});

  if(response.data) {
    dispatch({ type: EDIT_STYLE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: EDIT_STYLE_FAIL })
  }
}

export const deleteStyle = (token, hType, oid) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.delete(`${ROOT_URL}/outfits/edit/${oid}/`, {headers});

  if(response.status === 204) {
    dispatch({ type: DELETE_STYLE_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: DELETE_STYLE_FAIL })
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

export const fetchOutfitDetail = (token, hType, id, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(`${ROOT_URL}/outfits/detail/${id}`, { headers });
    callback(response.data);
  } catch(e) {
    console.log(e);
  }
}
