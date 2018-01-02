import axios from 'axios';

import {
  C_DETAIL_LOAD_SUCCESS,
  C_DETAIL_LOAD_FAIL,
  CREATE_CLOTH_SUCCESS,
  CREATE_CLOTH_FAIL,
  UPDATE_CLOTH_SUCCESS,
  UPDATE_CLOTH_FAIL,
  DELETE_CLOTH_SUCCESS,
  DELETE_CLOTH_FAIL,


  FETCH_TOP_LIST_SUCCESS,
  FETCH_TOP_LIST_FAIL,
  FETCH_OUTERWEAR_LIST_SUCCESS,
  FETCH_OUTERWEAR_LIST_FAIL,
  FETCH_BOTTOM_LIST_SUCCESS,
  FETCH_BOTTOM_LIST_FAIL,
  FETCH_SHOES_LIST_SUCCESS,
  FETCH_SHOES_LIST_FAIL,
  FETCH_ETC_LIST_SUCCESS,
  FETCH_ETC_LIST_FAIL,

  FETCH_NEXT_TOP_SUCCESS,
  FETCH_NEXT_TOP_FAIL,
  FETCH_NEXT_OUTERWEAR_SUCCESS,
  FETCH_NEXT_OUTERWEAR_FAIL,
  FETCH_NEXT_BOTTOM_SUCCESS,
  FETCH_NEXT_BOTTOM_FAIL,
  FETCH_NEXT_SHOES_SUCCESS,
  FETCH_NEXT_SHOES_FAIL,
  FETCH_NEXT_ETCS_SUCCESS,
  FETCH_NEXT_ETCS_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const createCloth = (token, hType, clothObject) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let {base64, name, bigType, clothType, selectedSeasonIds,
    gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
    brand, location, link, inWardrobe, onlyMe, description} = clothObject;

  let image = base64;

  let response = await axios.post(`${ROOT_URL}/clothes/create/`, {
    image,
    name, bigType, clothType, selectedSeasonIds,
    gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
    brand, location, link, inWardrobe, onlyMe, description
  }, {headers});
  
  if(response.data) {
    dispatch({ type: CREATE_CLOTH_SUCCESS, payload: bigType })
  } else {
    dispatch({ type: CREATE_CLOTH_FAIL })
  }
}

export const editCloth = (token, hType, clothObject) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let {
    name, bigType, clothType, selectedSeasonIds, gender,
  selectedSizeIds, selectedColorIds, inWardrobe, onlyMe, selectedStyleIds, id
  } = clothObject;

  let response = await axios.put(`${ROOT_URL}/clothes/update/`, {
    cid: id,
    name, bigType, clothType, selectedSeasonIds, gender,
    selectedSizeIds, selectedColorIds, inWardrobe, onlyMe, selectedStyleIds
  }, {headers});

  if(response.status===200) {
    dispatch({ type: UPDATE_CLOTH_SUCCESS, payload: bigType })
  } else {
    dispatch({ type: UPDATE_CLOTH_FAIL })
  }
}

export const deleteCloth = (token, hType, cid, bigClothType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.delete(`${ROOT_URL}/clothes/edit/${cid}/`, {headers});

  if(response.status === 204) {
    dispatch({ type: DELETE_CLOTH_SUCCESS, payload: bigClothType })
  } else {
    dispatch({ type: DELETE_CLOTH_FAIL })
  }
}

export const fetchTopAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/1/`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_TOP_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_TOP_LIST_FAIL });
  }
}

export const fetchTopNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_TOP_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_NEXT_TOP_FAIL });
  }
}

export const fetchOuterwearAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/2/`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_OUTERWEAR_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_OUTERWEAR_LIST_FAIL });
  }
}

export const fetchOuterwearNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_OUTERWEAR_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_NEXT_OUTERWEAR_FAIL });
  }
}
export const fetchBottomAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/3/`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_BOTTOM_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_BOTTOM_LIST_FAIL });
  }
}

export const fetchBottomNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_BOTTOM_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_NEXT_BOTTOM_FAIL });
  }
}
export const fetchShoesAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/4/`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_SHOES_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_SHOES_LIST_FAIL });
  }
}

export const fetchShoesNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_SHOES_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_NEXT_SHOES_FAIL });
  }
}
export const fetchEtcsAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/5/`, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_ETC_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_ETC_LIST_FAIL });
  }
}

export const fetchEtcsNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: FETCH_NEXT_ETCS_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: FETCH_NEXT_ETCS_FAIL });
  }
}

export const fetchClothDetail = (token, hType, id, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(`${ROOT_URL}/clothes/detail/${id}`, { headers });
    callback(response.data);
  } catch(e) {
    console.log(e);
  }
}
