import React from 'react';
import './css/message.css';

const Test = () => (
  <div className="box">
    box
  </div>
);

class Messages extends React.Component {
  render() {
    return (
      <div id="messages" className="container">
        <Test />
      </div>
    );
  }
}

export default Messages;