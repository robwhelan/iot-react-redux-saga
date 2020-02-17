// types of action
export const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  SUBSCRIBE_TO_WEBSOCKET: 'SUBSCRIBE_TO_WEBSOCKET',
  RECEIVE_WEBSOCKET_MESSAGE: 'RECEIVE_WEBSOCKET_MESSAGE',
  DISCONNECT_FROM_WEBSOCKET: 'DISCONNECT_FROM_WEBSOCKET',
  WEBSOCKET_CONNECTION_ERROR: 'WEBSOCKET_CONNECTION_ERROR',
  DISCONNECT_FROM_WEBSOCKET_SUCCESS: 'DISCONNECT_FROM_WEBSOCKET_SUCCESS'
};
// actions
export const disconnectFromWebsocketSuccess = (payload) => ({
  type: Types.DISCONNECT_FROM_WEBSOCKET_SUCCESS,
  payload: payload
})

export const webSocketConnectionError = (payload) => ({
  type: Types.WEBSOCKET_CONNECTION_ERROR,
  payload: payload
})

export const subscribeToWebsocket = (payload) => ({
  type: Types.SUBSCRIBE_TO_WEBSOCKET,
  payload: payload
})

export const receiveWebsocketMessage = (payload) => ({
  type: Types.RECEIVE_WEBSOCKET_MESSAGE,
  payload: payload
})

export const disconnectFromWebsocket = (payload) => ({
  type: Types.DISCONNECT_FROM_WEBSOCKET,
  payload: payload
})

const createItem = task => ({
  type: Types.CREATE_ITEM,
  payload: task
});

const deleteItem = id => ({
  type: Types.DELETE_ITEM,
  payload: id
});

export default {
  createItem,
  deleteItem,
  subscribeToWebsocket,
  receiveWebsocketMessage,
  disconnectFromWebsocket,
  Types
};
