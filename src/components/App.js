import React, { Component } from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import CommentList from './CommentList.js'
import CommentDetail from './CommentDetail.js'
import EditComment from './EditComment.js'

class App extends Component {

  state = {
    cates : ['All', 'meal', 'food', 'day']
  }

  onSelectType = (cate) => {
    console.log('onSelectType:', cate);
  }

  render() {
    const { cates } = this.state

    return (
      <div className="App">

        <Route exact path='/' render={()=>(
          <div>
            <h1>
              Readable
            </h1>
            <ul className='readable-types'>
              {cates.map((cate) => (
                <li key={cate} onClick={() => this.onSelectType(cate)} className='subheader'>
                  {cate}
                </li>
              ))}
            </ul>
            <CommentList>
            </CommentList>

            <Link
              className="open-add"
              to='/editComment'
            >comment</Link>
          </div>
        )}/>

        <Route path='/editComment' render={({ curComment })=>(
          <EditComment
          />
        )}/>

        <Route path='/commentDetail' render={({ curComment })=>(
          <CommentDetail
          />
        )}/>
      </div>
    );
  }
}

export default App;
