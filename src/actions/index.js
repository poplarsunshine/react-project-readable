import * as ReadableAPI from '../utils/api'

import {
    SET_CATEGORIES,
    SET_POSTS,
    SET_SORT_TYPE,
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
Actions for sort
*/
export function setSortType (type) {
  return {
    type : SET_SORT_TYPE,
    sortType : type
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

export function addPost(data, callback) {
  return dispatch => {
    ReadableAPI.createPost(data).then(
      (result) => {
        callback()
      }
    )
  }
}

export function postUpVote(data, callback) {
  return dispatch => {
    ReadableAPI.postUpVote(data).then(
      (result) => {
        callback()
      }
    )
  }
}

export function postDownVote(data, callback) {
  return dispatch => {
    ReadableAPI.postDownVote(data).then(
      (result) => {
        callback()
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
