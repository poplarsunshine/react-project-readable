import { default as UUID } from 'node-uuid'

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
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
