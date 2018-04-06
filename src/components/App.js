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

  componentDidMount() {
    console.log('App componentDidMount');
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <Route exact path='/' component={ Main }/>

          <Route exact path='/:category' component={ Main }/>

          <Route exact path='/readable/post/add' component={ AddPost } />

          <Route exact path='/:category/:postId/editPost' component={ EditPost }/>

          <Route exact path='/:category/:id' component={ PostDetail }/>

          <Route exact path='/:category/:id/addComment' component={ AddComment }/>

          <Route exact path='/:postId/:commentId/editComment' component={ EditComment }/>

        </div>

      </BrowserRouter>
    );
  }
}

export default App
