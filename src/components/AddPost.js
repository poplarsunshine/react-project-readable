import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { Item, Statistic, Label, FromGroup, Input, Grid, Icon } from 'semantic-ui-react'

import { addPost } from '../actions'
import { connect } from 'react-redux'

class AddPost extends Component {

    onCancel = () => {
      this.props.history.goBack();
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})

      console.log('addpost values:', values);
      this.props.addPost(values, () => {
        this.props.history.push('/');
      });
    }

    render() {
      const { categories } = this.props
        return (
          <div>
          <h1>
            Add Post
          </h1>
            <h1 className='close-create-comment' onClick={() => this.onCancel()}>Close</h1>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
                <div>
                  Select Category:
                  <select name='category'>
                    <option value="none" selected>None</option>
                    {categories && categories.map && categories.map((categorie) => (
                      <option value={categorie.name}>{categorie.name}</option>
                    ))}
                  </select>
                </div>
                <br/>
                <input type='text' name='title' placeholder='Title'></input>
                <input type='text' name='body' placeholder='Body'></input>
                <input cotent-row type='text' name='author' placeholder='Author'></input>
                <button className="btn-green">Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

function mapStateToProps ({ categories }) {
    return {
        categories,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data, callback) => dispatch(addPost(data, callback)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost)
