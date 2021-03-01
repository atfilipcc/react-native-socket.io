import { Platform, processColor } from "react-native";
import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { reducer } from './reducer'
import {LOCAL_IP_ADDRESS} from '@env'

const Local = Platform.OS === 'ios' ? LOCAL_IP_ADDRESS : LOCAL_IP_ADDRESS

const socket = io(Local);
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);