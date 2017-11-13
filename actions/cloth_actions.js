import axios from 'axios';

import {
  CLOTHES_LIST_SUCCESS,
  CLOTHES_LIST_FAIL,
  C_DETAIL_LOAD_SUCCESS,
  C_DETAIL_LOAD_FAIL,
  CREATE_CLOTH_SUCCESS,
  CREATE_CLOTH_FAIL,
} from './types';
const ROOT_URL = 'http://10.0.2.2:8000';

export const createCloth = (token, hType, clothObject) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let {base64, text, bigType, clothType, selectedSeasonIds,
    gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
    brand, location, link, inWardrobe, onlyMe} = clothObject;

  let image = base64;

  let response = await axios.post(`${ROOT_URL}/clothes/create/`, {
    image,
    text, bigType, clothType, selectedSeasonIds,
    gender, selectedSizeIds, selectedColorIds, selectedStyleIds,
    brand, location, link, inWardrobe, onlyMe
  }, {headers});

  console.log(response.data);

  if(response.data) {
    dispatch({ type: CREATE_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CREATE_CLOTH_FAIL })
  }
}

export const fetchClothesAll = (token, hType) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/list/`, { headers });
  if (response.status === 200) {
    const types = {
      tops: [],
      outwears: [],
      bottoms: [],
      shoes: [],
      etcs: []
    }

    response.data.forEach(item => {
      switch (item.big_cloth_type) {
        case 't':
          types.tops.push(item);
          break;
        case 'o':
          types.outwears.push(item);
          break;
        case 'b':
          types.bottoms.push(item);
          break;
        case 's':
          types.shoes.push(item);
          break;
        case 'e':
          types.etcs.push(item);
          break;
        default:
          break
      }
    });
    dispatch({ type: CLOTHES_LIST_SUCCESS, payload: types });
  } else {
    dispatch({ type: CLOTHES_LIST_FAIL });
  }
}

export const fetchClothDetail = (token, hType, id) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(`${ROOT_URL}/clothes/detail/${id}`, { headers });
  if (response.status === 200) {
    dispatch({ type: C_DETAIL_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: C_DETAIL_LOAD_FAIL })
  }
}
