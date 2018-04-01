import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import db from './db';
import Sender from './sender';
import reducer from '../redux/reducers';

const store = createStore(reducer);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reset: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    if (!this.state.reset) {
      db.put({...data, replies: []})
      .then(data => {
        if (data.ok) {
          // 插入成功
          console.log(data);
          this.setState({ reset: true });
          this.props.dispatch({
            type: "HAS_NEW_MESSAGE"
          });
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
      <Sender reset={this.state.reset} onSubmit={this.onSubmit} />
    );
  }
}

export default connect()(Board);
