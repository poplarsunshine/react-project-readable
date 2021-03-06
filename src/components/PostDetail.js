import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import Comment from './Comment.js'
import NotFound from './NotFound.js'
import * as ReadableAPI from '../utils/api'

import { fetchPosts, fetchComments } from '../actions'
import { connect } from 'react-redux'

class PostDetail extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
    }

    onCancel = () => {
      this.props.history.goBack();
    }

    componentDidMount() {
      console.log('PostDetail componentDidMount postId', this.props.match.params.id);
      this.props.fetchPosts();
      this.props.fetchComments(this.props.match.params.id);
    }

    render() {
      let category = this.props.match.params.category
      let postId = this.props.match.params.id
      console.log('match.params.postId:', postId);
      let post = {}
      if(this.props.posts && this.props.posts.data){
          const postList = this.props.posts.data.filter(post => post.id === postId);
          post = postList.length > 0 ? postList[0] : {} ;
      }
      console.log('post', post);

      let postComments = {}
      if(this.props.comments && this.props.comments[postId]){
          postComments = this.props.comments[postId]
      }

      return (
        !(post && post.category === category) ?
        <NotFound/>
        :
        <div>
          <h1>
            Post Detail
          </h1>

          <h1 className='close-create-comment' onClick={() => this.onCancel()}>Close</h1>

          <Post className='post-detail'
            post = {post}
            history={this.props.history}
          >
          </Post>

          <br/>
          <br/>
          <Link
            to = {{
              pathname: `/${post.category}/${post.id}/addComment`
            }}
          >Add Comment</Link>

          <div className="comments">
            <ol className='comment-list'>
              {postComments && postComments.map && postComments.map((comment) => (
                <li key={comment.id}>
                  <Comment
                    comment={comment}
                    history={this.props.history}
                    >
                  </Comment>
                </li>
              ))}
            </ol>
          </div>
        </div>
     )
   }
}

function mapStateToProps ({ posts, comments }) {
    return {
      posts,
      comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
      fetchPosts: (data) => dispatch(fetchPosts(data)),
      fetchComments: (data) => dispatch(fetchComments(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail)
