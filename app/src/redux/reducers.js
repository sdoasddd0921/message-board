import { combineReducers } from 'redux';

const messageDefaultState = {
  getNewMessae: false
}

const messages = (state=messageDefaultState, actions) => {
  switch (actions.type) {
    case "HAS_NEW_MESSAGE":
      return {...state, getNewMessae: true};
    case "HAS_NO_MESSAGE":
      return {...state, getNewMessae: false};
    default:
      return state;
  }
}

// 一页10条留言
const replyOption = {
  replying: false
};
const messageListState = new Array(10).fill(replyOption);

const messageList = (state=messageListState, actions) => {
  if (actions.type === "REPLY") {
    if (actions.index === undefined) {
      return messageListState;
    }
    const newReplyOption = [...messageListState];
    newReplyOption.splice(actions.index, 1, actions.payload);
    return newReplyOption;
  } else {
    return messageListState;
  }
}

const defaultPagination = {
  page: 1
}

const pagination = (state=defaultPagination, actions) => {
  switch (actions.type) {
    case "CHANGE_OUT_PAGE":
      return {
        page: actions.page
      }
    default:
      return state;
  }
};

export default combineReducers({
  messages,
  messageList,
  pagination
});