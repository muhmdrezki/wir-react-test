
import { FETCH_CONTACTS, UPDATE_CONTACTS } from "../constans/index";

const initialState = {
  contacts: []
};

function rootReducer(state = initialState, action) {
  if(action.type === FETCH_CONTACTS) {
    return Object.assign({}, state, {
      contacts: state.contacts.concat(action.payload)
    });
  }
  if(action.type === UPDATE_CONTACTS) {
    state.contacts = [];
    return Object.assign({}, state, {
      contacts: state.contacts.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;