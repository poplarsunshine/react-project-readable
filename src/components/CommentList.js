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
              {comment.title
                + '\n' + comment.body}
            </li>
            </Link>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
