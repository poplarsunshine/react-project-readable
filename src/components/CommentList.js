import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class CommentList extends Component {

  static propTypes = {
    comments : PropTypes.array.isRequired,
  }

  render() {
    const { comments } = this.props

    return (
      <div className="comments">
        <ol className='comment-list'>
          {comments.map((comment) => (
            <Link
              to='/commentDetail'
            >
            <li key={comment.id} className='comment-grid'>
              <div className="cotent-row">
                <div className="text-left">
                    Title:
                </div>
                <div className="text-right">
                    {comment.title}
                </div>
              </div>
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
                    CommentCount:
                </div>
                <div className="text-right">
                    {comment.commentCount}
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
                    {comment.timestamp}
                </div>
              </div>
            </li>
            </Link>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
