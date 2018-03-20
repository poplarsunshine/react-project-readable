import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CommentDetail extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
    }

    render() {
        return (
          <div>
            <h1>
              Detail
            </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
              </div>
            </form>
          </div>
       )
    }
}

export default CommentDetail
