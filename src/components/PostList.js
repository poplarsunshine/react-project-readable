import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import '../App.css';
import { Item, Statistic, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'

class PostList extends Component {

  static propTypes = {
    posts : PropTypes.array.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  render() {
    const { posts, postUpVote, postDownVote, postEdit, postDelete, postDetail } = this.props

    return (
      <div className="comments">
        <ol className='comment-list'>
          {posts.map((post) => (
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
    );
  }
}

export default PostList;
