import {combineReducers} from 'redux'
import {
  SET_CATEGORIES
} from '../actions/types'

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

export default combineReducers(
  {
    categories,
  }
)
