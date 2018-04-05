import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import Comment from './Comment.js'
import * as ReadableAPI from '../utils/api'

import { connect } from 'react-redux'

class PostDetail extends Component {

    static propTypes = {
      commentUpdate : PropTypes.func.isRequired,
    }

    handleSubmit = (e) => {
      e.preventDefault()
    }

    state = {
      comments : [],
      postID : '',
    }

    getPostDetail = (id) => {
      console.log('getPostDetail ID:', id);
      // ReadableAPI.getCommentsWithPost(id).then(
      //   (comments) => {
      //     console.log('comments:', comments);
      //     this.setState({comments})
      //   }
      // )
    }

    getComments = (id) => {
      console.log('getComments ID:', id);
      ReadableAPI.getCommentsWithPost(id).then(
        (comments) => {
          console.log('comments:', comments);
          this.setState({comments})
        }
      )
    }

    commentUpVote = (comment) => {
      ReadableAPI.commentUpVote(comment).then(
        (result) => {
          console.log('commentUpVote result:', result);
          this.getComments(this.state.postID);
        }
      )
    }

    commentDownVote = (comment) => {
      ReadableAPI.commentDownVote(comment).then(
        (result) => {
          console.log('commentDownVote result:', result);
          this.getComments(this.state.postID);
        }
      )
    }

    commentEdit = (data) => {
      console.log('commentEdit body:', data.body);
      const { commentUpdate } = this.props;
      commentUpdate(data);
    }

    commentDelete = (comment) => {
      ReadableAPI.commentDelete(comment).then(
        (result) => {
          this.getComments(this.state.postID);
        }
      )
    }

    componentDidMount() {
      let postId = this.props.match.params.id
      this.getPostDetail(postId);
      this.getComments(postId);
    }

    render() {
      let postId = this.props.match.params.id
      console.log('match.params.postId:', postId);
      let post = {}
      if(this.props.posts && this.props.posts.data){
          const postList = this.props.posts.data.filter(post => post.id === postId);
          post = postList.length > 0 ? postList[0] : {} ;
      }

        const { comments } = this.state;

        return (
          <div>
            <h1>
              Post Detail
            </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <Post className='post-detail'
              post = {post}
              history={this.props.history}
            >
            </Post>

            <Link
              to = {{
                pathname: `/${post.category}/${post.id}/addComment`
              }}
            >Add Comment</Link>

            <div className="comments">
              <ol className='comment-list'>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <Comment
                      comment={comment}
                      commentUpVote={(data) => {this.commentUpVote(data)}}
                      commentDownVote={(data) => {this.commentDownVote(data)}}
                      commentEdit={(data) => {this.commentEdit(data)}}
                      commentDelete={(data) => {this.commentDelete(data)}}
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

function mapStateToProps ({ categories, posts, sortType }) {
    return {
      posts
    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail)
