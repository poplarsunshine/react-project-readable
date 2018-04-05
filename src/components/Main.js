import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import '../App.css';
import { Item, Statistic, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'
import sortBy from 'sort-by'

import { fetchCategories, fetchPosts, fetchPostsWithType } from '../actions'
import { connect } from 'react-redux'

class Main extends Component {

  state = {
    // curPost : {},
    // curComment : {},
    sortType : 'timestamp',
  }

  setPostSortOrder = (sortType) => {
    console.log('sortBy:', sortType);
    this.setState({
      sortType : sortType
    })
  }

  static propTypes = {
    posts : PropTypes.array.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('Main componentDidMount');
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { sortType } = this.state

    const { categories, posts,
            onCreatePost, postUpVote, postDownVote, postEdit, postDelete, postDetail,
            onSelectAllType,
            onSelectType,
           } = this.props

    posts && posts.map && posts.sort(sortBy(sortType))

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
          <select onChange={event => this.setPostSortOrder(event.target.value)}>
            <option value='timestamp'>Date</option>
            <option value='voteScore'>Votes</option>
          </select>
        </div>

        <div className="comments">
          <ol className='comment-list'>
            {posts && posts.map && posts.map((post) => (
              <li key={post.id}>
                <Post
                  post={post}
                  postUpVote={(data) => {postUpVote(data)}}
                  postDownVote={(data) => {postDownVote(data)}}
                  postEdit={(data) => {postEdit(data)}}
                  postDelete={(data) => {postDelete(data)}}
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
)(Main)
