import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { fetchPosts, postDownVote, postUpVote, postDelete } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {

  static propTypes = {
    post : PropTypes.object.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDetail : PropTypes.func.isRequired,
  }

  postEdit = (post) => {
    this.props.history.push("/" + post.category + "/" + post.id + '/editPost');
  }

  postDetail = (post) => {
    this.props.history.push("/" + post.category + "/" + post.id);
  }


  render() {
    const { post, postEdit, postDetail, showDetailBtn } = this.props
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
              onClick={() => this.postEdit(post)}>
              Edit
            </button>
            <button class="ui button"
              onClick={() => this.props.postDelete(post , () => {
                // this.props.history.push('/');
              })}>
              Delete
            </button>
            {showDetailBtn && (
              <button class="ui button"
                onClick={() => this.postDetail(post)}>
                Detail
              </button>
            )}
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
        fetchPosts: (data) => dispatch(fetchPosts(data)),
        postDownVote: (data, callback) => dispatch(postDownVote(data, callback)),
        postUpVote: (data, callback) => dispatch(postUpVote(data, callback)),
        postDelete: (data, callback) => dispatch(postDelete(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)
