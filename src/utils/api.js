import { default as UUID } from 'node-uuid'

const api = 'http://localhost:3001'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'HETAO'
}

// 所有分类
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// 所有帖子
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

// 获取该类别的帖子
export const getPostsType = (path) =>
  fetch(`${api}/${path}/posts`, { headers })
    .then(res => res.json())

// 创建帖子
export const createPost = ({ title, body, author, category }) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: UUID.v4(),
      timestamp: Date.now(),
      title, body, author, category
    })
   })
    .then(res => res.json())

// 帖子 顶
export const postUpVote = ({ id }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option: 'upVote',
    })
   })
    .then(res => res.json())

// 帖子 踩
export const postDownVote = ({ id }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option: 'downVote',
    })
   })
    .then(res => res.json())

// 帖子 删除
export const postDelete = ({ id }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
   })
    .then(res => res.json())

/*
评论
*/

// 所有评论 /posts/:id/comments
export const getCommentsWithPost = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

// 评论 顶
export const commentUpVote = ({ id }) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option: 'upVote',
    })
   })
    .then(res => res.json())

// 评论 踩
export const commentDownVote = ({ id }) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      option: 'downVote',
    })
   })
    .then(res => res.json())

// 添加评论
export const createComment = ({ body, author }, { id }) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: UUID.v4(),
      timestamp: Date.now(),
      parentId: id,
      body, author
    })
   })
    .then(res => res.json())

// 删除评论
export const commentDelete = ({ id }) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers,
   })
    .then(res => res.json())
