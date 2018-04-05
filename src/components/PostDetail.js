import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Post from './Post.js'
import Comment from './Comment.js'
import * as ReadableAPI from '../utils/api'

class PostDetail extends Component {

    static propTypes = {
      post : PropTypes.object.isRequired,
      postUpVote : PropTypes.func.isRequired,
      postDownVote : PropTypes.func.isRequired,
      postEdit : PropTypes.func.isRequired,
      postDelete : PropTypes.func.isRequired,

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
      const post = this.props.post;
      this.setState(
        {postID : post.id}
      )
      // this.getPostDetail(this.state.postID);
      // this.getComments(this.state.postID);
      this.getPostDetail(post.id);
      this.getComments(post.id);
    }

    render() {
        const { post, postUpVote, postDownVote, postEdit, postDelete } = this.props;
        const { comments } = this.state;

        return (
          <div>
            <h1>
              Post Detail
            </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <Post className='post-detail'
              post = {post}
              postUpVote={(data) => {postUpVote(data)}}
              postDownVote={(data) => {postDownVote(data)}}
              postEdit={(data) => {postEdit(data)}}
              postDelete={(data) => {postDelete(data)}}
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

export default PostDetail
