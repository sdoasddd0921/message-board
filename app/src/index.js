import React from 'react';
import ReactDOM from 'react-dom';
import Message from './components/message';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import Board from './components/board';

import './css/index.css';

const store = createStore(reducer);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { reset: false };
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onSubmit(data) {
//     if (!this.state.reset) {
//       db.put({...data, replies: []})
//       .then(data => {
//         if (data.ok) {
//           // 插入成功
//           console.log(data);
//           this.setState({ reset: true });
//           this.props.dispatch({
//             type: "HAS_NEW_MESSAGE"
//           });
//         } else {
//           // 插入失败
//           alert('留言失败，请刷新页面后重试。');
//         }
//       }).catch(err => console.log(err));
//     } else {
//       this.setState({ reset: false });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Message />
//         <br/>
//         <Sender reset={this.state.reset} onSubmit={this.onSubmit} />
//       </div>
//     );
//   }
// }

// const Root = connect()(App);

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
