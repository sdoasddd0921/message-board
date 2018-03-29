import React from 'react';
import './css/sender.css'

class Sender extends React.Component {
  submit(e) {
    e.preventDefault();
    console.log('sub')
  }

  render() {
    return (
      <div id="sender" className="container">
        <form onSubmit={this.submit}>
          <textarea name="message" id="message" className="form-control" cols="30" rows="5"></textarea>
          <p>
            <label htmlFor="email">邮箱：</label>
            <input type="email" id="email" className="form-control" placeholder="name@example.com"/>
            <button type="submit" className="btn btn-primary">留言</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Sender;