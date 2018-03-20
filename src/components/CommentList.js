import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'

class CommentList extends Component {

  state = {
    comments : ['coment1', 'comment2', 'coment3']
  }

  render() {
    const { comments } = this.state

    return (
      <div className="comments">
        <ol className='comment-list'>
          {comments.map((comment) => (
            <Link
              to='/commentDetail'
            >
            <li key={comment} className='comment-grid'>
              {comment}
            </li>
            </Link>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
