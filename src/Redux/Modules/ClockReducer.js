import { fromJS } from 'immutable';
import { createStore } from 'redux'

const UPDATE_DATE_TIME = '@@REFLECT/UPDATE_DATE_TIME';

const d = new Date();

const initalState = fromJS({
  dateTime: {
    minute: d.getMinutes(),
    hour: d.getHours(),
    month: d.getMonth(),
    day: d.getDate(),
    weekday: d.getDay(),
  }
});

let store = createStore(reducer)

export function getState() {
 return store.getState();
};

export function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case UPDATE_DATE_TIME:
      return state.mergeIn(['dateTime'], fromJS({
        minute: action.payload.minute,
        hour: action.payload.hour,
        month: action.payload.month,
        day: action.payload.day,
        weekday: action.payload.weekday,
      }));
    default:
      return state;
  }
}

export function updateDateTime() {
  const d = new Date();
  const newDateTime = {
    minute: d.getMinutes(),
    hour: d.getHours(),
    month: d.getMonth(),
    day: d.getDate(),
    weekday: d.getDay(),
  };
  store.dispatch ({
    type: UPDATE_DATE_TIME,
    payload: newDateTime,
  });
}
