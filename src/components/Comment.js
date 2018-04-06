import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { commentDownVote, commentUpVote, commentDelete } from '../actions'
import { connect } from 'react-redux'

class Comment extends Component {

  static propTypes = {
    comment : PropTypes.object.isRequired,
    commentEdit : PropTypes.func.isRequired,
  }

  onCommentEdit = (comment) => {
    this.props.history.push("/" + comment.parentId + "/" + comment.id + '/editComment');
  }

  render() {
    const { comment, commentEdit } = this.props
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
              onClick={() => this.props.commentUpVote(comment)}>
              Vote Up
            </button>
            <button class="ui button"
              onClick={() => this.props.commentDownVote(comment)}>
              Vote Down
            </button>
          </div>

          <br/>
          <div className="cotent-row">
            <button class="ui primary button"
              onClick={() => this.onCommentEdit(comment)}>
              Edit
            </button>
            <button class="ui button"
              onClick={() => this.props.commentDelete(comment)}>
              Delete
            </button>
          </div>
          </div>
       )
    }
}


function mapStateToProps ({ categories, posts }) {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        commentDownVote: (data, callback) => dispatch(commentDownVote(data, callback)),
        commentUpVote: (data, callback) => dispatch(commentUpVote(data, callback)),
        commentDelete: (data, callback) => dispatch(commentDelete(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)
