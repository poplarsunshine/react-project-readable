import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import '../App.css';
import { Item, Statistic, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'

class CommentList extends Component {

  static propTypes = {
    comments : PropTypes.array.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  render() {
    const { comments, postUpVote, postDownVote, postEdit, postDelete, postDetail } = this.props

    return (
      <div className="comments">
        <ol className='comment-list'>
          {comments.map((comment) => (
            <li key={comment.id} className='comment-grid'>
              <Post post={comment}
                postUpVote={(data) => {postUpVote(data)}}
                postDownVote={(data) => {postDownVote(data)}}
                postEdit={(data) => {postEdit(data)}}
                postDelete={(data) => {postDelete(data)}}
                postDetail={(data) => {postDetail(data)}}
                >
              </Post>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
