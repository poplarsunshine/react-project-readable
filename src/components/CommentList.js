import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Item, Statistic, Label, Form, Button, Grid, Icon } from 'semantic-ui-react'

class CommentList extends Component {

  static propTypes = {
    comments : PropTypes.array.isRequired,
    postUpVote : PropTypes.func.isRequired,
    postDownVote : PropTypes.func.isRequired,
    postEdit : PropTypes.func.isRequired,
    postDelete : PropTypes.func.isRequired,
  }

  render() {
    const { comments, postUpVote, postDownVote, postEdit, postDelete } = this.props

    return (
      <div className="comments">
        <ol className='comment-list'>
          {comments.map((comment) => (
            // <Link
            //   to='/commentDetail'
            // >
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

              <div className="cotent-row">
                <button class="ui primary button"
                  onClick={() => postUpVote(comment)}>
                  Vote Up
                </button>
                <button class="ui button"
                  onClick={() => postDownVote(comment)}>
                  Vote Down
                </button>
              </div>
              <br/>
              <div className="cotent-row">
                <button class="ui primary button"
                  onClick={() => postEdit(comment)}>
                  Edit
                </button>
                <button class="ui button"
                  onClick={() => postDelete(comment)}>
                  Delete
                </button>
              </div>
            </li>
            // </Link>
          ))}
        </ol>
      </div>
    );
  }
}

export default CommentList;
