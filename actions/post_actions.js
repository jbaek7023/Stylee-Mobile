export const sendPost = ( imageUri, title, content ) => async dispatch => {
  // add this just above the axios request
  let image = new FormData();
  image.append('file', { uri: imageUri });

  let response = await axios.post(`${ROOT_URL}/rest-auth/registration/`, {
    image,
    title,
    content
  })

  if(response.data) {
    dispatch({ type: CREATE_CLOTH_SUCCESS, payload: response.data })
  } else {
    dispatch({ type: CREATE_CLOTH_FAIL })
  }
}

export const selectSeasons = ( id ) => ({
  type: SELECT_SEASON,
  payload: id
});
