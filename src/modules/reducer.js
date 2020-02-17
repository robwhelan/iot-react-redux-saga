import { Types } from "./action";
import _ from "lodash";

const defaultState = {
  messages: []
};

export const websocketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SUBSCRIBE_TO_WEBSOCKET: {

      let item = action.payload;
      let newItem = { message: item };
      let newState = _.cloneDeep(state);
      newState.messages.push(newItem);
      return newState;
    }
    default:
      return state;
  }
}


export default websocketReducer;
