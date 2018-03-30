import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Message from './message';
import Sender from './sender';
import { Pagination } from 'antd';

class App extends React.Component {
  onSubmit() {
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
