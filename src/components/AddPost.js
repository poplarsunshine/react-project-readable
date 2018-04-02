import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'

class AddPost extends Component {

  static propTypes = {
    categories : PropTypes.array.isRequired,
  }

  state = {
    category : ''
  }

    handleSubmit = (e) => {
      e.preventDefault()
      const values = serializeForm(e.target, {hash: true})
      console.log('handleSubmit:', values);
      values.category = this.state.category
      console.log('after handleSubmit:', values);
      if (this.props.onCreatePost)
        this.props.onCreatePost(values)
    }

    setCategorie = (category) => {
      this.setState(
        { category : category }
      );
    }

    render() {
      const { categories } = this.props
      console.log('categories:', categories);

        return (
          <div>
          <h1>
            Add Post
          </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-comment-form'>
              <div className='create-comment-details'>
              <div>
                Select Category:
                <select onChange={event => this.setCategorie(event.target.value)}>
                  <option value="none" selected>None</option>
                  {categories.map((categorie) => (
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

export default AddPost
