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
      const { comment, onUpdateComment } = this.props
      console.log('EditComment body:', comment.body);

        return (
          <div>
          <h1>
            Edit Comment
          </h1>
            <Link className='close-create-comment' to='/postDetail'>Close</Link>
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
