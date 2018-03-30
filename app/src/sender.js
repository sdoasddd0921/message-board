import React from 'react';
import { Input, Button } from 'antd';

import './css/sender.css';

const  { TextArea } = Input;

class Sender extends React.Component {
  submit(e) {
    e.preventDefault();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit();
    }
  }

  render() {
    const { type='留言' } = this.props;
    return (
      <div id="sender" className="container">
        <form onSubmit={this.submit.bind(this)}>
          <TextArea autosize={false} name="message" id="message" className="form-control" cols="30" rows="5"></TextArea>
          <p>
            <label htmlFor="email">邮箱：</label>
            <Input type="email" id="email" className="form-control" placeholder="name@example.com"/>
            <Button htmlType="submit" type="primary" >{type}</Button>
          </p>
        </form>
      </div>
    );
  }
}

export default Sender;