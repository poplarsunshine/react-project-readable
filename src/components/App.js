import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/api'
import { fetchCategories, fetchPosts, fetchPostsWithType } from '../actions'
import sortBy from 'sort-by'
import { connect } from 'react-redux'

import Main from './Main.js'
import PostDetail from './PostDetail.js'
import EditPost from './EditPost.js'
import AddPost from './AddPost.js'
import EditComment from './EditComment.js'
import AddComment from './AddComment.js'


class App extends Component {

  state = {
    curPost : {},
    curComment : {},
    sortType : 'timestamp',
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
        this.props.fetchPosts();
      }
    )
  }

  postDownVote = (post) => {
    ReadableAPI.postDownVote(post).then(
      (result) => {
        this.props.fetchPosts();
      }
    )
  }

  postEdit = (data, post) => {
    console.log('postEdit ID:', post.id);
    ReadableAPI.postUpdate(data, post).then(
      (result) => {
        this.props.fetchPosts();
      }
    )
  }

  postDelete = (post) => {
    ReadableAPI.postDelete(post).then(
      (result) => {
        this.props.fetchPosts();
      }
    )
  }

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
      this.props.fetchCategories();
      this.props.fetchPosts();
  }

  render() {
    const { post, sortType } = this.state
    const { posts, categories } = this.props

    console.log('render props posts:', posts);

    posts && posts.map && posts.sort(sortBy(sortType))

    return (
      <div className="App">

        <Route exact path='/' render={({ history })=>(
          <Main

          onSelectAllType = {() => {
            this.props.fetchPosts();
          }}
          onSelectType = {(type) => {
            this.props.fetchPostsWithType(type)
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
            history.push("/" + post.category + "/" + post.id + '/editPost');
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

        <Route exact path='/:category' render={({ history })=>(
          <Main
          onSelectAllType = {() => {
            this.props.fetchPosts();
          }}
          onSelectType = {(type) => {
            this.props.fetchPostsWithType(type)
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
            history.push("/" + post.category + "/" + post.id + '/editPost');
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

        <Route exact path='/readable/post/add' render={({ history })=>(
          <AddPost
            categories = {this.props.categories}
            onCreatePost={(post) => {
              this.addPost(post)
              history.push('/')
            }}
          />
        )}/>

        <Route exact path='/:category/:id/editPost' render={({ history })=>(
          <EditPost
            post = {this.state.curPost}
            onUpdatePost={(data, post) => {
              this.postEdit(data, post)
              history.push('/')
            }}
          />
        )}/>

        <Route exact path='/:category/:id' render={({ history })=>(
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
              history.push("/" + post.category + "/" + post.id + '/editPost');
            }}
            postDelete = {(post) => {
              this.postDelete(post)
            }}
            commentUpdate={(comment) => {
              this.setState({
                curComment : comment
              })
              history.push("/" + comment.parentId + "/" + comment.id + '/editComment');
            }}
          />
        )}/>

        <Route exact path='/:category/:id/addComment' render={({ history })=>(
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

        <Route exact path='/:parentId/:id/editComment' render={({ history })=>(
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

function mapStateToProps ({ categories, posts }) {
    return {
        categories,
        posts,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchCategories: (data) => dispatch(fetchCategories(data)),
        fetchPosts: (data) => dispatch(fetchPosts(data)),
        fetchPostsWithType: (data) => dispatch(fetchPostsWithType(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
