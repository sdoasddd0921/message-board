import React from 'react';
import Sender from './sender';
import { Button, Pagination } from 'antd';
import db from './db';
import { connect } from 'react-redux';
import formate from './utils/dateFormate';
import md5 from 'md5';
import './css/message.css';

// 每页留言条数和回复数量
const COUNT = 10;
const REPLIES = 5;

class Message extends React.Component {
  state = {
    reset: false,
    replies: [],
    page: 1
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

  changePage(
    page=this.state.page,
    size=REPLIES,
    replies=this.props.doc.replies
  ) {
    const start = REPLIES * (page - 1);
    let end = REPLIES * page;
    if (end > replies.length) {
      end = replies.length;
    }
    this.setState({
      page: page,
      replies: replies.slice(start, end)
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
          return db.put(doc);
        })
        .then(doc => {
          this.props.dispatch({
            type: "HAS_NEW_MESSAGE"
          });
        })
        .catch(err => console.log('update error:', err));
      this.setState({ reset: true });
    }
  }

  componentDidMount() {
    this.changePage();
  }

  componentWillReceiveProps(nextProps) {
    let newPage = this.state.page;
    if (nextProps.doc._id !== this.props.doc._id) {
      newPage = 1
    }
    this.changePage(newPage,REPLIES,nextProps.doc.replies);
  }

  render() {
    const { replying } = this.props;
    const { email, message, replies, time } = this.props.doc;
    const rows = replies.length;

    const replyIns = this.state.replies.map((rep, index) => (
      <div className="reply-in-reply-box" key={index}>
        <p>
          邮箱：<span>{rep.email}</span>
          <span className="reply-date">{formate(rep.time)}</span>
        </p>
        <p className="reply-in-message">{rep.reply}</p>
      </div>
    ));

    return (
      <div className="box">
        <div className="box-title">
          <div className="avatar">
            <img 
              alt="avatar"
              className="avatar-img"
              src={`https://s.gravatar.com/avatar/${md5(email)}?s=64`}
            />
          </div>
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
            current={this.state.page}
            onChange={this.changePage.bind(this)}
            total={rows} 
            defaultPageSize={REPLIES} 
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