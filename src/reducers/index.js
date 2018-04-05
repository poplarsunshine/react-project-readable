import {combineReducers} from 'redux'
import {
  SET_CATEGORIES,
  SET_SORT_TYPE,
  SET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SET_POST_COMMENTS,
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
    case UPDATE_POST:
      return {
        ...state,
        data: state.data.map((post) => {return post.id === action.post.id ? action.post : post})
      }
    case DELETE_POST:
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.post.id)
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

function comments (state = {}, action) {
  switch (action.type) {
    case SET_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments.filter(comment => comment.deleted === false)
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
    comments,
  }
)
