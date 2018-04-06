import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

import { commentEdit } from '../actions'
import { connect } from 'react-redux'

class EditComment extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      values.id = this.props.match.params.commentId
      this.props.commentEdit(values, () => {
        this.props.history.goBack();
      })
    }

    onCancel = () => {
      this.props.history.goBack();
    }

    render() {
      let postId = this.props.match.params.postId
      let commentId = this.props.match.params.commentId

      let comments = this.props.comments[postId]
      let comment = {}
      if(comments && comments.map){
          const commentList = comments.filter(comment => comment.id === commentId)
          comment = commentList.length > 0 ? commentList[0] : {} ;
      }

        return (
          <div>
          <h1>
            Edit Comment
          </h1>
          <h1 className='close-create-comment' onClick={() => this.onCancel()}>Close</h1>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                body:
                <input type='text' name='body' placeholder='Body' defaultValue={comment.body}></input>
                <button className="btn-green">Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

function mapStateToProps ({ comments }) {
    return {
      comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        commentEdit: (data, callback) => dispatch(commentEdit(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditComment)
