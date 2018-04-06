import * as ReadableAPI from '../utils/api'

import {
    SET_CATEGORIES,
    SET_SORT_TYPE,
    SET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    SET_POST_COMMENTS,
    ADD_POST_COMMENT,
    UPDATE_POST_COMMENT,
    DELETE_POST_COMMENT,
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
export function setSortType (sortType) {
  return {
    type : SET_SORT_TYPE,
    sortType
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

export function postEdit(data, callback) {
  return dispatch => {
    ReadableAPI.postUpdate(data, data).then(
      (result) => {
        callback()
        dispatch(actionUpdatePost(result));
      }
    )
  }
}

function actionSetPosts (posts) {
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

/*
Actions for comments
*/
export function fetchComments(postId) {
  return dispatch => {
    ReadableAPI.getCommentsWithPost(postId).then(
      (comments) => {
        dispatch(actionSetPostComments(postId, comments));
      }
    )
  }
}

export function addPostComment(data, callback) {
  return dispatch => {
    ReadableAPI.createComment(data, data).then(
      (result) => {
        dispatch(actionAddPostComment(result));
        callback()
      }
    )
  }
}

export function commentUpVote(data, callback) {
  return dispatch => {
    ReadableAPI.commentUpVote(data).then(
      (result) => {
        // callback()
        dispatch(actionUpdatePostComment(result));
      }
    )
  }
}

export function commentDownVote(data, callback) {
  return dispatch => {
    ReadableAPI.commentDownVote(data).then(
      (result) => {
        // callback()
        dispatch(actionUpdatePostComment(result));
      }
    )
  }
}

export function commentDelete(data, callback) {
  return dispatch => {
    ReadableAPI.commentDelete(data).then(
      (result) => {
        // callback()
        dispatch(actionDeletePostComment(result));
      }
    )
  }
}

export function commentEdit(data, callback) {
  return dispatch => {
    ReadableAPI.commentUpdate(data, data).then(
      (result) => {
        callback()
        dispatch(actionUpdatePostComment(result));
      }
    )
  }
}

function actionSetPostComments (postId, comments) {
  return {
    type : SET_POST_COMMENTS,
    postId,
    comments
  }
}

function actionAddPostComment (comment) {
  return {
    type : ADD_POST_COMMENT,
    comment
  }
}

function actionUpdatePostComment (comment) {
  return {
    type : UPDATE_POST_COMMENT,
    comment
  }
}

function actionDeletePostComment (comment) {
  return {
    type : DELETE_POST_COMMENT,
    comment
  }
}
