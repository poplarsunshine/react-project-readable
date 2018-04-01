import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {

  static propTypes = {
    comment : PropTypes.object.isRequired,
    commentUpVote : PropTypes.func.isRequired,
    commentDownVote : PropTypes.func.isRequired,
    commentEdit : PropTypes.func.isRequired,
    commentDelete : PropTypes.func.isRequired,
  }

  render() {
    const { comment, commentUpVote, commentDownVote, commentEdit, commentDelete } = this.props
      return (
        <div className='comment-grid'>
          <div className="cotent-row">
            <div className="text-left">
                Body:
            </div>
            <div className="text-right">
                {comment.body}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                Author:
            </div>
            <div className="text-right">
                {comment.author}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                VoteScore:
            </div>
            <div className="text-right">
                {comment.voteScore}
            </div>
          </div>
          <div className="cotent-row">
            <div className="text-left">
                Time:
            </div>
            <div className="text-right">
                {new Date(comment.timestamp).toLocaleString()}
            </div>
          </div>

          <br/>
          <div className="cotent-row">
            <button class="ui primary button"
              onClick={() => commentUpVote(comment)}>
              Vote Up
            </button>
            <button class="ui button"
              onClick={() => commentDownVote(comment)}>
              Vote Down
            </button>
          </div>

          <br/>
          <div className="cotent-row">
            <button class="ui primary button"
              onClick={() => commentEdit(comment)}>
              Edit
            </button>
            <button class="ui button"
              onClick={() => commentDelete(comment)}>
              Delete
            </button>
          </div>
          </div>
       )
    }
}

export default Comment
