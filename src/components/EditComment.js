import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class EditComment extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      if (this.props.onUpdateComment)
        this.props.onUpdateComment(values, this.props.comment)
    }

    render() {
      const { comment, onUpdateComment, onUpdateCommentCancel } = this.props
      console.log('EditComment body:', comment.body);

        return (
          <div>
          <h1>
            Edit Comment
          </h1>
          <h1 className='close-create-comment' onClick={() => onUpdateCommentCancel()}>Close</h1>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                body:
                <input type='text' name='body' placeholder='Body' defaultValue={comment.body}></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

export default EditComment
