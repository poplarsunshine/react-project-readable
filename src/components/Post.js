import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class Post extends Component {

  static propTypes = {
    post : PropTypes.array.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
  }

  render() {
    const { post, postUpVote, postDownVote, postEdit, postDelete } = this.props
      return (
          <div>
          <Link
            to='/commentDetail'
          >
          <div className="cotent-row">
            <div className="text-left">
                Title:
            </div>
            <div className="text-right">
                {post.title}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                Body:
            </div>
            <div className="text-right">
                {post.body}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                Author:
            </div>
            <div className="text-right">
                {post.author}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                CommentCount:
            </div>
            <div className="text-right">
                {post.commentCount}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                VoteScore:
            </div>
            <div className="text-right">
                {post.voteScore}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                Time:
            </div>
            <div className="text-right">
                {post.timestamp}
            </div>
          </div>
          </Link>
          <br/>
          <div className="cotent-row">
            <button class="ui primary button"
              onClick={() => postUpVote(post)}>
              Vote Up
            </button>
            <button class="ui button"
              onClick={() => postDownVote(post)}>
              Vote Down
            </button>
          </div>
          <br/>
          <div className="cotent-row">
            <button class="ui primary button"
              onClick={() => postEdit(post)}>
              Edit
            </button>
            <button class="ui button"
              onClick={() => postDelete(post)}>
              Delete
            </button>
          </div>
          </div>
       )
    }
}

export default Post
