import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import Sender from './sender';
import db from './db';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import './css/index.css';

const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reset: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    if (!this.state.reset) {
      db.put({...data, replys: []})
      .then(data => {
        if (data.ok) {
          // 插入成功
          this.setState({ reset: true });
        } else {
          // 插入失败
          alert('留言失败，请刷新页面后重试。');
        }
      }).catch(err => console.log(err));
    } else {
      this.setState({ reset: false });
    }
  }

  render() {
    return (
      <div>
        <Message />
        <br/>
        <Sender reset={this.state.reset} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
