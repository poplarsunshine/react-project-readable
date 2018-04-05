import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { fetchPosts, postDownVote, postUpVote } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {

  static propTypes = {
    post : PropTypes.object.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  render() {
    const { post, postEdit, postDelete, postDetail, showDetailBtn } = this.props
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
              onClick={() => this.props.postUpVote(post, () => {
                this.props.fetchPosts();
              })}>
              Vote Up
            </button>
            <button class="ui button"
              onClick={() => this.props.postDownVote(post, () => {
                this.props.fetchPosts();
              })}>
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

function mapStateToProps ({ categories, posts, sortType }) {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPosts: (data) => dispatch(fetchPosts(data)),
        postDownVote: (data, callback) => dispatch(postDownVote(data, callback)),
        postUpVote: (data, callback) => dispatch(postUpVote(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
