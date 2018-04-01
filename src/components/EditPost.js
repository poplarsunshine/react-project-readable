import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class EditPost extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      console.log('handleSubmit:', values);
      if (this.props.onUpdatePost)
        this.props.onUpdatePost(values, this.props.post)
    }

    render() {

      const { post, onUpdatePost } = this.props
      console.log('EditPost title:', post.title);

        return (
          <div>
          <h1>
            Edit Post
          </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                <input type='text' name='title' placeholder='Title' defaultValue={post.title}></input>
                <input type='text' name='body' placeholder='Body' defaultValue={post.body}></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

export default EditPost
