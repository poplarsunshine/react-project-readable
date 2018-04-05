import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import '../App.css';
import { Item, Statistic, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'
import sortBy from 'sort-by'

import { fetchCategories, fetchPosts, fetchPostsWithType, setSortType } from '../actions'
import { connect } from 'react-redux'

class Main extends Component {

  state = {
    // curPost : {},
    // curComment : {},
  }

  static propTypes = {
    posts : PropTypes.array.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('Main componentDidMount');
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { categories, posts, sortType,
            postEdit, postDetail,
            onSelectAllType,
            onSelectType,
           } = this.props

    let postsData = {}
    if(posts && posts.data){
      postsData = posts.data
    }
    postsData && postsData.map && postsData.sort(sortBy(sortType))

    return (
      <div>

        <h1>
          Readable
        </h1>

        <Link
          to = '/readable/post/add'
          className='open-add'
        >Add Post</Link>

        <ul className='readable-types'>
          <Link
            to='/'
          >
          <li key={'AllPosts'} onClick={() => this.props.fetchPosts()} className='subheader'>
            {'AllPosts'}
          </li>
          </Link>

          {categories && categories.map && categories.map((cate) => (
            <Link
              to={cate.name}
            >
            <li key={cate.name} onClick={() => this.props.fetchPostsWithType(cate.path)} className='subheader'>
              {cate.name}
            </li>

            </Link>
          ))}

        </ul>
        <br/>
        <div>
          <label>Sort By:</label>
          <select onChange={event => this.props.setSortType(event.target.value)}>
            <option value='timestamp'>Date</option>
            <option value='voteScore'>Votes</option>
          </select>
        </div>

        <div className="comments">
          <ol className='comment-list'>
            {postsData && postsData.map && postsData.map((post) => (
              <li key={post.id}>
                <Post
                  post={post}
                  postEdit={(data) => {postEdit(data)}}
                  postDetail={(data) => {postDetail(data)}}
                  showDetailBtn = {true}
                  >
                </Post>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, sortType }) {
    return {
        categories,
        posts,
        sortType
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchCategories: (data) => dispatch(fetchCategories(data)),
        fetchPosts: (data) => dispatch(fetchPosts(data)),
        fetchPostsWithType: (data) => dispatch(fetchPostsWithType(data)),
        setSortType: (data) => dispatch(setSortType(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
