import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Message from './message';
import Sender from './sender';

const App = () => (
  <div>
    <Message />
    <Sender />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
