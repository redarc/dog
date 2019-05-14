import { createStore } from 'redux';

function reducer(state = {}, action: any) {
  return action;
}

let store: any = createStore(reducer);

export default store;
