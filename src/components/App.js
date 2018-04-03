import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/api'
import sortBy from 'sort-by'


import Main from './Main.js'
import PostDetail from './PostDetail.js'
import EditPost from './EditPost.js'
import AddPost from './AddPost.js'
import EditComment from './EditComment.js'
import AddComment from './AddComment.js'


class App extends Component {

  state = {
    categories : [],
    posts : [],
    curCategory : '',
    curPost : {},
    curComment : {},
    sortType : 'timestamp',
  }

  onSelectAllType = () => {
    this.setState({
      curCategory : ''
    })
    this.getAllPosts();
  }

  onSelectType = (path) => {
    console.log('onSelectType:', path);
    this.setState({
      curCategory : path
    })
    this.getPostsType(path);
  }

  postSortOrder = (sortType) => {
    console.log('sortBy:', sortType);
    this.setState({
      sortType : sortType
    })
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

  postEdit = (data, post) => {
    console.log('postEdit ID:', post.id);
    ReadableAPI.postUpdate(data, post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  postDelete = (post) => {
    ReadableAPI.postDelete(post).then(
      (result) => {
        console.log('result:', result);
        this.getAllPosts();
      }
    )
  }

  // postDetail = (post) => {
  //   console.log('postDetail ID:', post.id);
  // }

  // Comment
  addComment = (comment, post) => {
    console.log('comment body', comment.body);
    console.log('post id', post.id);
    ReadableAPI.createComment(comment, post).then(
      (result) => {
        console.log('createComment result:', result);
      }
    )
  }

  updateComment = (data, comment) => {
    console.log('update body', data.body);
    console.log('comment id', comment.id);
    ReadableAPI.commentUpdate(data, comment).then(
      (result) => {
        console.log('updateComment result:', result);
      }
    )
  }

  componentDidMount() {
      this.getAllCategories();
      this.getAllPosts();
  }

  render() {
    const { categories, posts, post, sortType } = this.state
    posts.sort(sortBy(sortType))

    return (
      <div className="App">

        <Route exact path='/' render={({ history })=>(
          <Main

          onSelectAllType = {() => {
            this.onSelectAllType()
          }}
          onSelectType = {(type) => {
            this.onSelectType(type)
          }}
          postSortOrder = {(order) => {
            this.postSortOrder(order)
          }}

          categories = {categories}
          sortType = {sortType}
          posts = {posts}
          postUpVote = {(post) => {
            this.postUpVote(post)
          }}
          postDownVote = {(post) => {
            this.postDownVote(post)
          }}
          postEdit = {(post) => {
            console.log('postEdit ID:', post.id);
            this.setState({
              curPost : post
            })
            history.push('/editPost');
          }}
          postDelete = {(post) => {
            this.postDelete(post)
          }}
          postDetail = {(post) => {
            console.log('postDetail ID:', post.id);
            this.setState({
              curPost : post
            })
            history.push("/" + post.category + "/" + post.id);
          }}
          />
        )}/>

        <Route path='/:category' render={({ history })=>(
          <Main
          onSelectAllType = {() => {
            this.onSelectAllType()
          }}
          onSelectType = {(type) => {
            this.onSelectType(type)
          }}
          postSortOrder = {(order) => {
            this.postSortOrder(order)
          }}

          categories = {categories}
          sortType = {sortType}
          posts = {posts}
          postUpVote = {(post) => {
            this.postUpVote(post)
          }}
          postDownVote = {(post) => {
            this.postDownVote(post)
          }}
          postEdit = {(post) => {
            console.log('postEdit ID:', post.id);
            this.setState({
              curPost : post
            })
            history.push('/editPost');
          }}
          postDelete = {(post) => {
            this.postDelete(post)
          }}
          postDetail = {(post) => {
            console.log('postDetail ID:', post.id);
            this.setState({
              curPost : post
            })
            history.push("/" + post.category + "/" + post.id);
          }}
          />
        )}/>

        <Route path='/addPost' render={({ history })=>(
          <AddPost
            categories = {this.state.categories}
            onCreatePost={(post) => {
              this.addPost(post)
              history.push('/')
            }}
          />
        )}/>

        <Route path='/editPost' render={({ history })=>(
          <EditPost
            post = {this.state.curPost}
            onUpdatePost={(data, post) => {
              this.postEdit(data, post)
              history.push('/')
            }}
          />
        )}/>

        <Route path='/:category/:id' render={({ history })=>(
          <PostDetail
            post = {this.state.curPost}
            postUpVote = {(post) => {
              this.postUpVote(post)
            }}
            postDownVote = {(post) => {
              this.postDownVote(post)
            }}
            postEdit = {(post) => {
              console.log('postEdit ID:', post.id);
              this.setState({
                curPost : post
              })
              history.push('/editPost');
            }}
            postDelete = {(post) => {
              this.postDelete(post)
            }}
            commentUpdate={(comment) => {
              this.setState({
                curComment : comment
              })
              history.push('/editComment')
            }}
          />
        )}/>

        <Route path='/addComment' render={({ history })=>(
          <AddComment
            onCreateComment={(comment) => {
              const post = this.state.curPost;
              this.addComment(comment, post)
              history.push("/" + post.category + "/" + post.id);
            }}
            onCreateCommentCancel = {() => {
              // history.goback();
              const post = this.state.curPost;
              history.push("/" + post.category + "/" + post.id);
            }}
          />
        )}/>

        <Route path='/editComment' render={({ history })=>(
          <EditComment
            comment = {this.state.curComment}
            onUpdateComment={(data, comment) => {
              console.log('comment:', comment.id);
              const post = this.state.curPost;
              this.updateComment(data, comment)
              history.push("/" + post.category + "/" + post.id);
            }}
            onUpdateCommentCancel = {() => {
              const post = this.state.curPost;
              history.push("/" + post.category + "/" + post.id);
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
