import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import CommentList from './CommentList.js'
import CommentDetail from './CommentDetail.js'
import EditComment from './EditComment.js'
import API from './EditComment.js'
import * as ReadableAPI from '../utils/api'

class App extends Component {

  state = {
    categories : [],
    posts : [],
  }

  onSelectAllType = () => {
    this.getAllPosts();
  }

  onSelectType = (path) => {
    console.log('onSelectType:', path);
    this.getPostsType(path);
  }

  addPost = (post) => {
    console.log('newPost:', post);
    this.createPost(post);
  }

  // API
  getAllCategories = () => {
    ReadableAPI.getAllCategories().then(
      (categories) => {
        console.log('categories:', categories);
        this.setState({categories})
      }
    )
  }

  getAllPosts = () => {
    ReadableAPI.getAllPosts().then(
      (posts) => {
        console.log('posts:', posts);
        this.setState({posts})
      }
    )
  }

  getPostsType = (path) => {
    ReadableAPI.getPostsType(path).then(
      (posts) => {
        console.log(path, ' posts:', posts);
        this.setState({posts})
      }
    )
  }

  createPost = (post) => {
    ReadableAPI.createPost(post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  postUpVote = (post) => {
    ReadableAPI.postUpVote(post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  postDownVote = (post) => {
    ReadableAPI.postDownVote(post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  postEdit = (post) => {
    console.log('postEdit ID:', post.id);
  }

  postDelete = (post) => {
    ReadableAPI.postDelete(post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  componentDidMount() {
      this.getAllCategories();
      this.getAllPosts();
  }

  render() {
    const { categories, posts } = this.state

    return (
      <div className="App">

        <Route exact path='/' render={({ history })=>(
          <div>
            <h1>
              Readable
            </h1>
            <ul className='readable-types'>
              <li key={'AllPosts'} onClick={() => this.onSelectAllType()} className='subheader'>
                {'AllPosts'}
              </li>
              {categories.map((cate) => (
                <li key={cate.name} onClick={() => this.onSelectType(cate.path)} className='subheader'>
                  {cate.name}
                </li>
              ))}
            </ul>
            <CommentList
              comments = {posts}
              postUpVote = {(post) => {
                this.postUpVote(post)
              }}
              postDownVote = {(post) => {
                this.postDownVote(post)
              }}
              postEdit = {(post) => {
                this.postEdit(post)
              }}
              postDelete = {(post) => {
                this.postDelete(post)
              }}
            >
            </CommentList>

            <Link
              className="open-add"
              to='/editComment'
            >comment</Link>
          </div>
        )}/>

        <Route path='/editComment' render={({ history })=>(
          <EditComment
            onCreatePost={(post) => {
              this.addPost(post)
              history.push('/')
            }}
          />
        )}/>

        <Route path='/commentDetail' render={({ curComment })=>(
          <CommentDetail
          />
        )}/>
      </div>
    );
  }
}

export default App;
