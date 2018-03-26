import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class EditPost extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      console.log('handleSubmit:', values);
      if (this.props.onCreatePost)
        this.props.onCreatePost(values)
    }

    render() {
        return (
          <div>
            <Link className='close-create-comment' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                <input type='text' name='category' placeholder='Category'></input>
                <input type='text' name='title' placeholder='Title'></input>
                <input type='text' name='body' placeholder='Body'></input>
                <input type='text' name='author' placeholder='Author'></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

export default EditPost
