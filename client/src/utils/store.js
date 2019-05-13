import { createStore } from 'redux';

function reducer(state = {}, action) {
  return action;
}

let store = createStore(reducer);

export default store;
