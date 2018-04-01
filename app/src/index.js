import React from 'react';
import ReactDOM from 'react-dom';
import Message from './components/message';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import Board from './components/board';

import './css/index.css';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <div>
      <Message />
      <br/>
      <Board />
    </div>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
