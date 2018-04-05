import * as ReadableAPI from '../utils/api'

import {
    SET_CATEGORIES,
    SET_SORT_TYPE,
    SET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
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
        dispatch(actionSetPosts(posts));
      }
    )
  }
}

export function fetchPostsWithType(path) {
  return dispatch => {
    ReadableAPI.getPostsType(path).then(
      (posts) => {
        dispatch(actionSetPosts(posts));
      }
    )
  }
}

export function addPost(data, callback) {
  return dispatch => {
    ReadableAPI.createPost(data).then(
      (result) => {
        callback()
        dispatch(actionAddPost(result));
      }
    )
  }
}

export function postUpVote(data, callback) {
  return dispatch => {
    ReadableAPI.postUpVote(data).then(
      (result) => {
        // callback()
        dispatch(actionUpdatePost(result));
      }
    )
  }
}

export function postDownVote(data, callback) {
  return dispatch => {
    ReadableAPI.postDownVote(data).then(
      (result) => {
        // callback()
        dispatch(actionUpdatePost(result));
      }
    )
  }
}

export function postDelete(data, callback) {
  return dispatch => {
    ReadableAPI.postDelete(data).then(
      (result) => {
        callback()
        dispatch(actionDeletePost(result));
      }
    )
  }
}

function actionSetPosts (posts) {

  console.log('actionSetPosts:', posts);

  return {
    type : SET_POSTS,
    posts
  }
}

function actionAddPost (post) {
  return {
    type : ADD_POST,
    post
  }
}

function actionUpdatePost (post) {
  return {
    type : UPDATE_POST,
    post
  }
}

function actionDeletePost (post) {
  return {
    type : DELETE_POST,
    post
  }
}
