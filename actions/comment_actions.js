import axios from 'axios';

import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_DETAIL_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from './types';

const ROOT_URL = 'http://10.0.2.2:8000';

export const createComment = (token, hType, postType, id, text, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let ptype = 'outfit';
    if(postType==2) {
      ptype = 'cloth';
    }
    let content = text;
    let response = await axios.post(`${ROOT_URL}/comments/create/?type=${ptype}&id=${id}`, {
      content
    }, {headers});
    callback();
  } catch(e) {
    console.log(e);
  }
}

export const replyOnComment = (token, hType, id, message, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }

    let response = await axios.post(`${ROOT_URL}/comments/reply/`, {
      pid: id,
      message
    }, {headers});
    callback();
  } catch(e) {
    console.log(e);
  }
}

export const deleteComment = (token, hType, id, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }

    let response = await axios.delete(`${ROOT_URL}/comments/edit/${id}/`, {headers});
    callback();
  } catch(e) {
    console.log(e);
  }
}


export const fetchComments = (token, hType, id, postType, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }

    let reaponse = null;
    if(postType==1) {
      response = await axios.get(`${ROOT_URL}/comments/olist/${id}/`, { headers });
    } else if (postType==2) {
      response = await axios.get(`${ROOT_URL}/comments/clist/${id}/`, { headers });
    }
    callback(response.data);
  } catch(e) {
    console.log(e);
  }
}

export const fetchCommentDetail = (token, hType, id, callback) => async dispatch => {
  try {
    let headers = { 'Authorization': `JWT ${token}`};
    if(hType==1) {
      headers = { 'Authorization': `JWT ${token}`};
    } else if (hType==2) {
      headers = { 'Authorization': `Bearer ${token}`};
    }
    let response = await axios.get(`${ROOT_URL}/comments/detail/${id}/`, { headers });
    callback(response.data);
  } catch(e) {
    console.log(e);
  }
}
