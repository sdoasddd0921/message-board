import { combineReducers } from 'redux';

const messageDefaultState = {
  clearMessage: false
}

const messages = (state=messageDefaultState, actions) => {
  switch (actions.type) {
    case "CLEAR_MESSAGE":
      return {...state, clearMessage: true};
    case "MESSAGE_CLEARED":
      return {...state, clearMessage: false};
    default:
      return state;
  }
}

// 一页10条留言
const replyOption = {
  replying: false,
  clearReply: false
};
const messageListState = new Array(10).fill(replyOption);

const messageList = (state=messageListState, actions) => {
  if (actions.type === "REPLY") {
    if (actions.index === undefined) {
      return state;
    }
    const newReplyOption = [...messageListState];
    newReplyOption.splice(actions.index, 1, actions.payload);
    return newReplyOption;
  } else {
    return state;
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