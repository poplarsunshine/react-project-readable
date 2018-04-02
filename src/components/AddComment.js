import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class AddComment extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      console.log('handleSubmit:', values);
      if (this.props.onCreateComment)
        this.props.onCreateComment(values)
    }

    render() {
      const { onCreateCommentCancel } = this.props
        return (
          <div>
          <h1>
            Add Comment
          </h1>
            <h1 className='close-create-comment' onClick={() => onCreateCommentCancel()}>Close</h1>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                <input type='text' name='body' placeholder='Body'></input>
                <input type='text' name='author' placeholder='Author'></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

export default AddComment
