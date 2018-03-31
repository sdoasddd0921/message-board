import React from 'react';
import Sender from './sender';
import { Button, Pagination } from 'antd';
import db from './db';
import { connect } from 'react-redux';
import formate from './utils/dateFormate';
import './css/message.css';

const COUNT = 2
const page = 2

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
    const { replys=[] } = this.props;
    const replyIns = replys.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>邮箱：<span>{rep.email}</span><span className="date">{rep.date}</span></p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));
    const rows = replys.length > 0 ? replys.length : 1;
    // https://s.gravatar.com/avatar/90d88b8fe862194845c1cb01dc1ebb60?s=80
    // gravatar avatar
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






class Message extends React.Component {

  toggle() {
    const payload = {
      replying: !this.props.replying,
      clearReply: false
    };
    this.props.dispatch({
      payload,
      type: "REPLY",
      index: this.props.index,
    });
  }

  onReply(data) {
    const payload = {
      replying: this.props.replying
    };
    this.props.dispatch({
      payload,
      type: "REPLY",
      index: this.props.index,
    });
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { replying } = this.props;
    const { email, message, replys, time } = this.props.doc;

    const replyIns = replys.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>邮箱：<span>{rep.email}</span><span className="date">{rep.date}</span></p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));
    const rows = replys.length > 0 ? replys.length : 1;

    return (
      <div className="box">
        <div className="box-title">
          <div className="avatar"></div>
          <div className="info">
            <p className="email-big">{email}</p>
            <p className="date-big">{formate(time)}</p>
          </div>
        </div>
        <div className="box-message">
          <p>{message}</p>
          <Button 
            className="reply" 
            type="secondary" 
            size="small" 
            onClick={this.toggle.bind(this)}
          >{replying ? '收起' : '回复'}</Button>
        </div>
        <div className="reply-box">
          {
            replying
            ? <Sender type="回复" onSubmit={this.onReply}/>
            : null
          }
        </div>
        <div className="reply-in-reply">
          {replyIns}
        </div>
        <div className="pagination">
          {/* 内部的翻页条 */}
          <Pagination 
            defaultCurrent={1} 
            total={rows} 
            defaultPageSize={5} 
            hideOnSinglePage={true} 
            size="small" 
          />
        </div>
      </div>
    );
  }
}

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    db.allDocs({
      include_docs: true,
      limit: COUNT * page,
      skip: COUNT * (page - 1)
    })
      .then(docs => {
        console.log(docs.rows);
        this.setState({ messages: docs.rows });
      })
      .catch(err => console.log(err))
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      // 连接被复用组件
      const ConnectedMessage = connect((state) => ({
        ...state.messageList[index]
      }))(Message);

      return (
        <ConnectedMessage 
          doc={message.doc}
          index={index}
          key={index}
        />
      );
    });

    return (
      <div id="messages" className="container">
        <Test replys={replytest} />
        <Test />
        {messages}
        <div className="pagination">
          <Pagination defaultCurrent={1} hideOnSinglePage={true} total={32} />
        </div>
      </div>
    );
  }
}

export default Messages;