import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class PostDetail extends Component {

    static propTypes = {
      post : PropTypes.object.isRequired,
    }

    handleSubmit = (e) => {
      e.preventDefault()
    }

    getPostDetail = (post) => {
      console.log('PostDetail ID:', post.id);
    }

    componentDidMount() {
      const post = this.props.post;
      this.getPostDetail(post);
    }

    render() {
        const { post } = this.props;
        return (
          <div>
            <h1>
              Post Detail
            </h1>
            <Link className='close-create-comment' to='/'>Close</Link>
            <h1>
              {post.id}
            </h1>
          </div>
       )
    }
}

export default PostDetail
