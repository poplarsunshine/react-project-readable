import * as ReadableAPI from '../utils/api'

import {
    SET_CATEGORIES,
    SET_POSTS,
} from './types';

/*
Actions for categories
*/
export function fetchCategories() {
  return dispatch => {
    ReadableAPI.getAllCategories().then(
      (categories) => {
        dispatch(setCategories(categories));
      }
    )
  }
}

function setCategories (data) {
  return {
    type : SET_CATEGORIES,
    categories : data
  }
}

/*
Actions for posts
*/
export function fetchPosts() {
  return dispatch => {
    ReadableAPI.getAllPosts().then(
      (posts) => {
        dispatch(setPosts(posts));
      }
    )
  }
}

export function fetchPostsWithType(path) {
  return dispatch => {
    ReadableAPI.getPostsType(path).then(
      (posts) => {
        dispatch(setPosts(posts));
      }
    )
  }
}

function setPosts (data) {
  return {
    type : SET_POSTS,
    posts : data
  }
}
