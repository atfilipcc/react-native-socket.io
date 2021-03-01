export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Chat: undefined;
  Contacts: undefined;
};

export type TabOneParamList = {
  JoinScreen: undefined;
  ChatScreen: undefined;
};

export type TabTwoParamList = {
  ContactsScreen: undefined;
};

export interface IUserObject {
  avatar: string,
  userId: string,
  username: string,
}

export interface IMessageObject {
  _id: number,
  createdAt: Date
  text: string,
  user: IUserObject
}

export interface IChatMessageIdObject {
 [key: string]: IMessageDataObject
}

export interface IMessageDataObject {
  messages: Array<IMessageObject>,
  username: string,
}

export interface IReduxPMObject {
  chatId: string,
  message: IMessageObject
}

export interface IReduxAction {
  data: ReduxIntersectedActionData,
  type: string,
}

export interface IReduxState {
  onlineUsers: Array<IUserObject>
  currentUser: any,
  chatMessages: any,
}

export type ReduxIntersectedActionData = Array<IUserObject> & IReduxPMObject
