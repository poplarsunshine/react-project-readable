import React, { Component } from 'react';
import '../App.css';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import * as ReadableAPI from '../utils/api'

import Main from './Main.js'
import PostDetail from './PostDetail.js'
import EditPost from './EditPost.js'
import AddPost from './AddPost.js'
import EditComment from './EditComment.js'
import AddComment from './AddComment.js'
import NotFound from './NotFound.js'

import { fetchCategories, fetchPosts } from '../actions'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    console.log('App componentDidMount');
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { categories } = this.props

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Main }/>
            {categories && categories.map && categories.map((category) => (
              <Route exact path={'/' + category.path} component={ Main }/>
            ))}
            <Route exact path='/readable/post/add' component={ AddPost } />
            <Route exact path='/:category/:postId/editPost' component={ EditPost }/>
            <Route exact path='/:category/:id' component={ PostDetail }/>
            <Route exact path='/:category/:id/addComment' component={ AddComment }/>
            <Route exact path='/:postId/:commentId/editComment' component={ EditComment }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ categories, posts, sortType }) {
    return {
        categories,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchCategories: (data) => dispatch(fetchCategories(data)),
        fetchPosts: (data) => dispatch(fetchPosts(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
