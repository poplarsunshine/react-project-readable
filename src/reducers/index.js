import {combineReducers} from 'redux'
import {
  SET_CATEGORIES,
  SET_SORT_TYPE,
  SET_POSTS,
  ADD_POST,
} from '../actions/types'

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        data: action.posts.filter(post => post.deleted === false)
      }
    case ADD_POST:
      return {
        ...state,
        data: state.data.concat([ action.post ]),
      }
    default:
      return state;
  }
}

function sortType (state = {}, action) {
  switch (action.type) {
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.sortType,
      }
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
