import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Post extends Component {

  static propTypes = {
    post : PropTypes.object.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  render() {
    const { post, postUpVote, postDownVote, postEdit, postDelete, postDetail, showDetailBtn } = this.props
      return (
          <div className='post-grid'>
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
                {new Date(post.timestamp).toLocaleString()}
            </div>
          </div>

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
            {showDetailBtn && (
              <button class="ui button"
                onClick={() => postDetail(post)}>
                Detail
              </button>
            )}
          </div>
          </div>
       )
    }
}

export default Post
