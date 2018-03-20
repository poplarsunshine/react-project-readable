import React, { Component } from 'react';
import '../App.css';
import CommentList from './CommentList.js'
import EditComment from './EditComment.js'

class App extends Component {

  state = {
    cates : ['All', 'meal', 'food', 'day']
  }

  render() {
    const { cates } = this.state

    return (
      <div className="App">
        <h1>
          Readable
        </h1>

        <ul className='readable-types'>
          {cates.map((cate) => (
            <li key={cate} className='subheader'>
              {cate}
            </li>
          ))}
        </ul>

        <CommentList>
        </CommentList>

        <div className="open-add">
        </div>
      </div>
    );
  }
}

export default App;
