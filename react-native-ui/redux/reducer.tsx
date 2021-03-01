import { IReduxAction, IReduxState } from "../types";

const initialState: IReduxState = {
    onlineUsers: [],
    currentUser: '',
    chatMessages: [],
  };
  
  export const reducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
      case "users_online":
        const chatMessages = { ...state.chatMessages };
        const onlineUsers = action.data;
        for (let i = 0; i < onlineUsers.length; i++) {
          const userId = onlineUsers[i].userId;
          if (chatMessages[userId] === undefined) {
            chatMessages[userId] = {
              messages: [],
              username: onlineUsers[i].username,
            };
          }
        }
        return { ...state, onlineUsers, chatMessages };
      case "get_current_user":
        return { ...state, currentUser: action.data };
      case "pm":
        const chatId = action.data.chatId;
        return {
          ...state,
          chatMessages: {
            ...state.chatMessages,
            [chatId]: {
              ...state.chatMessages[chatId],
              messages: [
                action.data.message,
                ...state.chatMessages[chatId].messages,
              ],
            },
          },
        };
      default:
        return state;
    }
  };