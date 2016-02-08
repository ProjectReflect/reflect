import { fromJS } from 'immutable';
import { createStore } from 'redux'

const UPDATE_TIME = '@@REFLECT/UPDATE_TIME';
const UPDATE_DATE = '@@REFLECT/UPDATE_DATE';

const initalState = fromJS({
  time: {
    hour: 0,
    minute: 0,
  },
  date: {
    month: 'nope',
    day: 0,
  },
});

let store = createStore(reducer)

export function getState() {
 return store.getState();
};

export function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case UPDATE_TIME:
      // do stuff here later
    case UPDATE_DATE:
      // do stuff here later
    default:
      return state;
  }
}

export function updateTime(newTime) {
  store.dispatch ({
    type: UPDATE_TIME,
    payload: newTime,
  });
}

export function updateDate(newDate) {
  store.dispatch ({
    type: UPDATE_DATE,
    payload: newDate,
  });
}
