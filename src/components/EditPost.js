import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

import { postEdit } from '../actions'
import { connect } from 'react-redux'

class EditPost extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      values.id = this.props.match.params.postId

      this.props.postEdit(values, () => {
        this.props.history.goBack();
      })
    }

    render() {

      let postId = this.props.match.params.postId
      let post = {}
      if(this.props.posts && this.props.posts.data){
          const postList = this.props.posts.data.filter(post => post.id === postId);
          post = postList.length > 0 ? postList[0] : {} ;
      }

        return (
          <div>
          <h1>
            Edit Post
          </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                title:
                <input type='text' name='title' placeholder='Title' defaultValue={post.title}></input>
                body:
                <input type='text' name='body' placeholder='Body' defaultValue={post.body}></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

function mapStateToProps ({ posts }) {
    return {
      posts
    }
}

function mapDispatchToProps (dispatch) {
    return {
        postEdit: (data, callback) => dispatch(postEdit(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost)
