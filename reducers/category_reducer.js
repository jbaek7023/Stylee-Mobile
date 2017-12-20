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
  CATEGORY_LIST_LOAD_SUCCESS,
  CATEGORY_LIST_LOAD_FAIL,
  CATELIST_NEXT_LOAD_SUCCESS,
  CATELIST_NEXT_LOAD_FAIL,
} from '../actions/types';

const INITIAL_STATE = { list: [], listOnOutfit: [], name: '', add: '', del: '', categories: []}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATEGORY_LIST_LOAD_SUCCESS:
      return { ...state, categories: action.payload.results, nextUri: action.payload.next }
    case CATEGORY_LIST_LOAD_FAIL:
      return { ...state, categories: null }
    case CATELIST_NEXT_LOAD_SUCCESS:
      return { ...state, categories: state.categories.concat(action.payload.results), nextUri: action.payload.next }
    case CATELIST_NEXT_LOAD_FAIL:
      return { ...state }
    case CATEGORIES_LOAD_SUCCESS:
      return { ...state, list: action.payload }
    case CATEGORIES_LOAD_FAIL:
      return { ...state, }
    case OUTFIT_CATEGORIES_LOAD_SUCCESS:
      return { ...state, listOnOutfit: action.payload}
    case OUTFIT_CATEGORIES_LOAD_FAIL:
      return { ...state }
    case CREATE_CATEGORY_SUCCESS:
      if(action.payload.id) {
        return { ...state, name: action.payload.name, id: action.payload.id}
      }
      return { ...state, name: action.payload.name}
    case CREATE_CATEGORY_FAIL:
      return { ...state }
    case ADD_TO_CATEGORY_SUCCESS:
      return { ...state, added: action.payload.added}
    case ADD_TO_CATEGORY_SUCCESS:
      return { ...state }
    case DELTE_FROM_CATEGORY_SUCCESS:
      return { ...state, removed: action.payload.removed}
    case DELTE_FROM_CATEGORY_SUCCESS:
      return { ...state }
    default:
      return state;
  }
}
