import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditComment extends Component {

    handleSubmit = (e) => {
      e.preventDefault()
    }

    render() {
        return (
          <div>
            <Link className='close-create-contact' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-contact-form'>
              <div className='create-contact-details'>
                <input type='text' name='name' placeholder='jack'></input>
                <input type='text' name='comment' placeholder=''></input>
                <button>Submit</button>
              </div>
            </form>
          </div>
       )
    }
}

export default EditComment
