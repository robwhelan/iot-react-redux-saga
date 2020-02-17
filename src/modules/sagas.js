import { call, put, take, fork, cancel, cancelled, putResolve } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { Types,
  subscribeToWebsocket,
  receiveWebsocketMessage,
  disconnectFromWebsocket,
  webSocketConnectionError,
  disconnectFromWebsocketSuccess } from './action.js';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions

const dispatch = putResolve;

function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('wss://echo.websocket.org');

    socket.onopen = function () {
      socket.send('can you hear me?');
      resolve(socket);
    };

    socket.onerror = function (e) {
      reject(e);
    }
  });
}

function createSocketChannel(socket) {
  return eventChannel(emit => {
    socket.onmessage = (event) => {
      emit(event.data)
    };

    socket.onclose = () => {
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    return unsubscribe;
  });
}

function* listenForSocketMessages() {
  let socket;
  let socketChannel;

  try {
    socket        = yield call(createWebSocketConnection);
    socketChannel = yield call(createSocketChannel, socket);

    // tell the application that we have a connection
    yield dispatch(subscribeToWebsocket('i have subscribed'));

    while (true) {
      // wait for a message from the channel
      const payload = yield take(socketChannel);

      // a message has been received, dispatch an action with the message payload
      yield dispatch(receiveWebsocketMessage(payload));
    }
  } catch (error) {
    yield dispatch(webSocketConnectionError('Error while connecting to the WebSocket'));
  } finally {
    if (yield cancelled()) {
      // close the channel
      socketChannel.close();

      // close the WebSocket connection
      socket.close();
      yield dispatch(disconnectFromWebsocket('disconnected from websocket'));
    } else {
      yield put.resolve(webSocketConnectionError('WebSocket error'));
    }
  }
}

export default function* connect() {
  // starts the task in the background
  const socketTask = yield fork(listenForSocketMessages);

  // when DISCONNECT action is dispatched, we cancel the socket task
  yield take(Types.DISCONNECT_FROM_WEBSOCKET);
  yield cancel(socketTask);
  yield dispatch(disconnectFromWebsocketSuccess('successfully disconnceted'));
}
