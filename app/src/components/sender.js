import React from 'react';
import { Button } from 'antd';

import '../css/sender.css';

class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    const timeStamp = String(Number(new Date()))
    if (typeof this.props.onSubmit === 'function') {
      let data;
      if (this.props.type === '回复') {
        data = {
          email: this.email.value,
          reply: this.message.value,
          time: timeStamp,
          _id: timeStamp
        }
      } else {
        data = {
          email: this.email.value,
          message: this.message.value,
          time: timeStamp,
          _id: timeStamp
        }
      }
      if (data.email && (data.message || data.reply)) {
        this.props.onSubmit(data);
      } else {
        alert('请检查您的邮箱或留言。');
      }
    }
  }

  clearMessage() {
    this.email.value = this.message.value = "";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.clearMessage();
      this.props.onSubmit();
    }
  }

  render() {
    const { type='留言' } = this.props;
    return (
      <div id="sender" className="container">
        <form onSubmit={this.submit}>
          <textarea 
            name="message" 
            id="message" 
            className="ant-input" 
            rows="4" 
            ref={txt => this.message=txt}
          ></textarea>
          <p>
            <label htmlFor="email">邮箱：</label>
            <input 
              type="email" 
              id="email" 
              className="ant-input" 
              placeholder="name@example.com" 
              ref={inp=>this.email=inp}
            />
            <Button htmlType="submit" type="primary" >{type}</Button>
          </p>
        </form>
      </div>
    );
  }
}

export default Sender;