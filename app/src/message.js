import React from 'react';
import Sender from './sender';
import { Button, Pagination } from 'antd';
import db from './db';
import { connect } from 'react-redux';
import formate from './utils/dateFormate';
import './css/message.css';

// 每页留言条数和回复数量
const COUNT = 3;
const REPLIES = 2;

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
    const { replies=[] } = this.props;
    const replyIns = replies.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>邮箱：<span>{rep.email}</span><span className="date">{rep.date}</span></p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));
    const rows = replies.length > 0 ? replies.length : 1;
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
          <Button 
            className="reply" 
            type="secondary" 
            size="small" 
            onClick={this.toggleHandler.bind(this,'reply')}
          >
            {this.state.reply?'收起':'回复'}
          </Button>
        </div>
        <div className="reply-box">
          {
            this.state.reply
            ? <Sender type="回复" />
            : null
          }
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
  state = {
    reset: false,
    rows: this.props.doc.replies.length
  };

  toggle() {
    const payload = {
      replying: !this.props.replying
    };
    this.props.dispatch({
      payload,
      type: "REPLY",
      index: this.props.index,
    });
  }

  onSubmit(data) {
    if (this.state.reset) {
      this.setState({ reset: false });
    } else {
      const { _id } = this.props.doc;
      console.log(data);
      db.get(_id)
        .then(doc => {
          doc.replies.push(data);
          console.log(doc.replies)
          return db.put(doc);
        })
        .then(doc => console.log(doc))
        .catch(err => console.log('update error:', err));
      this.setState({ reset: true });
    }
  }

  render() {
    const { replying } = this.props;
    const { email, message, replies, time } = this.props.doc;

    const replyIns = replies.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>邮箱：<span>{rep.email}</span><span className="date">{rep.date}</span></p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));
    const rows = replies.length > 0 ? replies.length : 1;

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
            ? <Sender 
                type="回复"
                reset = {this.state.reset}
                onSubmit={this.onSubmit.bind(this)}
              />
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
      messages: [],
      rows: 1,
      page: 1
    };
    this.getMessages = this.getMessages.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  getMessages() {
    const { page } = this.state;
    db.allDocs({
      include_docs: true,
      limit: COUNT * page,
      skip: COUNT * (page - 1)
    }).then(docs => {
      console.log(docs.rows)
      this.setState({
        messages: docs.rows,
        rows: docs.total_rows
      });
    }).catch(err => console.log(err));
  }

  changePage(page) {
    // 关闭所有的回复
    this.props.dispatch({ type: "REPLY" });
    this.setState(
      { page: page },
      this.getMessages
    );
  }

  componentDidMount() {
    this.getMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldGetMessae) {
      this.getMessages();
      this.props.dispatch({
        type: "HAS_NO_MESSAGE"
      });
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <Message 
          doc={message.doc}
          index={index}
          dispatch={this.props.dispatch}
          {...this.props.options[index]}
          key={index}
        />
      );
    });

    return (
      <div id="messages" className="container">
        <Test replies={replytest} />
        {messages}
        <div className="pagination">
          <Pagination 
            defaultCurrent={1}
            current={this.state.page}
            pageSize={COUNT}
            hideOnSinglePage={true}
            onChange={this.changePage}
            total={this.state.rows} 
          />
        </div>
      </div>
    );
  }
}

const macStateToProps = (state) => ({
  page: state.pagination.page,
  options: state.messageList,
  shouldGetMessae: state.messages.getNewMessae
});

export default connect(macStateToProps)(Messages);