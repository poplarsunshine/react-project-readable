import React, { Component } from 'react';
import '../App.css';

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
            <li key={comment} className='comment-grid'>
              {comment}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
