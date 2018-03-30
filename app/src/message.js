import React from 'react';
import Sender from './sender';
import './css/message.css';
import { Button, Pagination } from 'antd';

const replytest = [
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  },
  {
    email: 'teasda@123.123',
    date: '2018-3-30 09:54:25',
    reply: '回复测试回复测试回复测试啊回复测试回复测试回复测试啊'
  }
];

class Test extends React.Component {
  state = {
    reply: false,
    unfold: false
  };

  toggleHandler(type) {
    this.setState({ [type]: !this.state[type] });
  }

  render() {
    const { replyIn=[] } = this.props;
    const replyIns = replyIn.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>邮箱：<span>{rep.email}</span><span className="date">{rep.date}</span></p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));
    const rows = replyIn.length > 0 ? replyIn.length : 1;
    return (
      <div className="box">
        <div className="box-title">
          <div className="avatar"></div>
          <div className="info">
            <p className="email-big">testtestte@test.com</p>
            <p className="date-big">2018-3-30 09:11:08</p>
          </div>
        </div>
        <div className="box-message">
          <p>这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试这是一条留言测试</p>
          <Button className="reply" type="secondary" size="small" onClick={this.toggleHandler.bind(this,'reply')}>{this.state.reply?'收起':'回复'}</Button>
        </div>
        <div className="reply-box">
          {this.state.reply?<Sender type="回复" />:null}
        </div>
        <div className="reply-in-reply">
          {replyIns}
        </div>
        <div className="pagination">
          <Pagination defaultCurrent={1} total={rows} defaultPageSize={5} hideOnSinglePage={true} size="small" />
        </div>
      </div>
    );
  }
}

class Messages extends React.Component {
  render() {
    return (
      <div id="messages" className="container">
        <Test replyIn={replytest} />
        <Test />
      </div>
    );
  }
}

export default Messages;