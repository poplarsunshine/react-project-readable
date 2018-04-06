import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { addPost } from '../actions'
import { connect } from 'react-redux'

class AddPost extends Component {

    state = {
      selectCategory : ''
    }

    setCategorie = (category) => {
      this.setState(
        { selectCategory : category }
      );
    }

    onCancel = () => {
      this.props.history.goBack();
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      values.category = this.state.selectCategory

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
                <select onChange={event => this.setCategorie(event.target.value)}>
                  <option value="none" selected>None</option>
                  {categories && categories.map && categories.map((categorie) => (
                    <option value={categorie.name}>{categorie.name}</option>
                  ))}
                </select>
              </div>
              <br/>
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
