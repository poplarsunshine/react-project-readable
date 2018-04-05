import {combineReducers} from 'redux'
import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_SORT_TYPE,
} from '../actions/types'

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    default:
      return state;
  }
}

function sortType (state = {}, action) {
  switch (action.type) {
    case SET_SORT_TYPE:
      return action.sortType;
    default:
      return state;
  }
}

export default combineReducers(
  {
    categories,
    posts,
    sortType,
  }
)
