import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import Sender from './sender';
import { Pagination } from 'antd';
import PouchDB from 'pouchdb';
import './css/index.css';

const db = new PouchDB('http://localhost:5984/testdb');
db.info().then((info) => {
  console.log(info)
})

class App extends React.Component {
  onSubmit() {
    fetch('http://127.0.0.1:5984/testdb', {
      // method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    }).catch(err => console.log(err));
    console.log('leave message');
  }

  render() {
    return (
      <div>
        <Message />
        <div className="pagination">
          <Pagination defaultCurrent={1} hideOnSinglePage={true} total={32} />
        </div>
        <br/>
        <Sender onSubmit={this.onSubmit} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
