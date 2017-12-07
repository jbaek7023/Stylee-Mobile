import axios from 'axios';

import {
  OUTFIT_LOAD_SUCCESS,
  OUTFIT_LOAD_FAIL,
  O_DETAIL_LOAD_SUCCESS,
  O_DETAIL_LOAD_FAIL,
  CATEGORY_LIST_LOAD_SUCCESS,
  CATEGORY_LIST_LOAD_FAIL,
  CATEGORY_DETAIL_LOAD_SUCCESS,
  CATEGORY_DETAIL_LOAD_FAIL,
  CREATE_STYLE_SUCCESS,
  CREATE_STYLE_FAIL,

  STAR_OUTFIT_LOAD_SUCCESS,
  STAR_OUTFIT_LOAD_FAIL,
  LIKE_OUTFIT_SUCCESS,
  LIKE_OUTFIT_FAIL,
  UNLIKE_OUTFIT_SUCCESS,
  UNLIKE_OUTFIT_FAIL,
  BOOKMARK_OUTFIT_SUCCESS,
  BOOKMARK_OUTFIT_FAIL,
  UNBOOKMARK_OUTFIT_SUCCESS,
  UNBOOKMARK_OUTFIT_FAIL,
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

export const likeOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/create/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: LIKE_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: LIKE_OUTFIT_FAIL })
  }
}

export const unlikeOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/likes/delete/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: UNLIKE_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: UNLIKE_OUTFIT_FAIL })
  }
}

export const bookmarkOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/stars/create/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 201) {
    dispatch({ type: BOOKMARK_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: BOOKMARK_OUTFIT_FAIL })
  }
}

export const unbookmarkOutfit = (token, hType, outfitId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }
  let response = await axios.post(`${ROOT_URL}/stars/delete/?type=outfit&id=${outfitId}`, {
  }, {headers});

  if (response.status === 200) {
    dispatch({ type: UNBOOKMARK_OUTFIT_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: UNBOOKMARK_OUTFIT_FAIL })
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

export const loadCategoryAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/category/list/`, { headers });
  if (response.status === 200) {
    dispatch({ type: CATEGORY_LIST_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CATEGORY_LIST_LOAD_FAIL })
  }
}

export const fetchStarOutfitAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/stars/list/`, { headers });
  if (response.status === 200) {
    dispatch({ type: STAR_OUTFIT_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: STAR_OUTFIT_LOAD_FAIL })
  }
};
