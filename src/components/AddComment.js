import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

import { addPostComment } from '../actions'
import { connect } from 'react-redux'

class AddComment extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      values.id = this.props.match.params.id
      this.props.addPostComment(values, () => {
        this.props.history.goBack();
      });
    }

    render() {
      const { onCreateCommentCancel } = this.props

      return (
        <div>
        <h1>
          Add Comment
        </h1>
          <h1 className='close-create-comment' onClick={() => this.props.history.goBack()}>Close</h1>
          <form onSubmit={this.handleSubmit} className='create-comment-form'>
            <div className='create-comment-details'>
              <input type='text' name='body' placeholder='Body'></input>
              <input type='text' name='author' placeholder='Author'></input>
              <button className="btn-green">Submit</button>
            </div>
          </form>
        </div>
     )
   }
}

function mapStateToProps ({ comments, posts }) {
    return {
    }
}

function mapDispatchToProps (dispatch) {
    return {
      addPostComment: (data, callback) => dispatch(addPostComment(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddComment)
