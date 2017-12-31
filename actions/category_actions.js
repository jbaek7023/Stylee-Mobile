import axios from 'axios';

import {
  CATEGORIES_LOAD_SUCCESS,
  CATEGORIES_LOAD_FAIL,

// category detail
  CATEGORY_DETAIL_LOAD_SUCCESS,
  CATEGORY_DETAIL_LOAD_FAIL,
  CATEGORY_NEXT_OUTFITS_LOAD_SUCCESS,
  CATEGORY_NEXT_OUTFITS_LOAD_FAIL,

  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,

// get category
  OUTFIT_CATEGORIES_LOAD_SUCCESS,
  OUTFIT_CATEGORIES_LOAD_FAIL,

  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  ADD_TO_CATEGORY_SUCCESS,
  ADD_TO_CATEGORY_FAIL,
  DELETE_OUTFIT_FROM_CATEGORY_SUCCESS,
  DELETE_OUTFIT_FROM_CATEGORY_FAIL,
  CATEGORY_LIST_LOAD_SUCCESS,
  CATEGORY_LIST_LOAD_FAIL,
  CATELIST_NEXT_LOAD_SUCCESS,
  CATELIST_NEXT_LOAD_FAIL,

  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const fetchCategoryDetail = (token, hType, id, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }

    let response = await axios.get(`${ROOT_URL}/category/detail/${id}/?page=1`, { headers });
    callback(response.data);
  } catch(e) {
    console.log(e);
  }
}

export const fetchNextOutfitForCategoryDetail = (token, hType, id, uri, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    if(uri == 1) {
      uri = `${ROOT_URL}/outfits/outfitsbycategory/1/?page=2`
    }

    let response = await axios.get(uri, { headers });
    callback(response.results, response.next);
  } catch(e) {
    console.log(e);
  }
}

export const editCategoryDetail = (token, hType, categoryId, {name, onlyMe}) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.put(`${ROOT_URL}/category/edit/${categoryId}/`, {
      name, only_me: onlyMe
    }, {headers});
    if (response.status === 200) {
      dispatch({ type: EDIT_CATEGORY_SUCCESS })
    } else {
      dispatch({ type: EDIT_CATEGORY_FAIL })
    }
  } catch(e) {
    console.log(e);
  }
}

export const deleteCategory = (token, hType, categoryId) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.delete(`${ROOT_URL}/category/edit/${categoryId}/`, {headers});

  if(response.status === 204) {
    dispatch({ type: REMOVE_CATEGORY_SUCCESS, payload: categoryId })
  } else {
    dispatch({ type: REMOVE_CATEGORY_FAIL })
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

export const loadCategoryNextAll = (token, hType, uri) => async dispatch => {
  let headers = { 'Authorization': `JWT ${token}`};
  if(hType==1) {
    headers = { 'Authorization': `JWT ${token}`};
  } else if (hType==2) {
    headers = { 'Authorization': `Bearer ${token}`};
  }

  let response = await axios.get(uri, { headers });
  if (response.status === 200) {
    dispatch({ type: CATELIST_NEXT_LOAD_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CATELIST_NEXT_LOAD_FAIL })
  }
}

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

export const fetchOutfitCategories = (token, hType, oid, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }

    let response = await axios.get(`${ROOT_URL}/outfits/catelist/${oid}/`, { headers });
    callback(response.data.categories);
  } catch(e) {
    console.log(e);
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
export const deleteOutfitFromCategory = (token, hType, oid, categoryId) => async dispatch => {
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
    dispatch({ type: DELETE_OUTFIT_FROM_CATEGORY_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: DELETE_OUTFIT_FROM_CATEGORY_FAIL })
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
