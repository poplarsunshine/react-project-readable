import React, { Component } from 'react';
import '../App.css';
import { Link, BrowserRouter, Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/api'

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
    console.log('App componentDidMount');
  }

  render() {
    const { post } = this.state

    return (
      <BrowserRouter>

      <div className="App">

        <Route exact path='/' component={ Main }/>

        <Route exact path='/:category' component={ Main }/>

        <Route exact path='/readable/post/add' component={ AddPost } />

        <Route exact path='/:category/:postId/editPost' component={ EditPost }/>

        <Route exact path='/:category/:id' component={ PostDetail }/>

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

      </BrowserRouter>
    );
  }
}

export default App
