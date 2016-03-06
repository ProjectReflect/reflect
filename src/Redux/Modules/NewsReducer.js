import { fromJS } from 'immutable';
import { createStore } from 'redux';
import { get } from '../../services/Fetch';

const UPDATE_NEWS = '@@REFLECT/UPDATE_NEWS';
const UPDATE_BUSY = '@@REFLECT/UPDATE_BUSY';

const initialState = fromJS({
  currentNews: [],
  busy: true,
});

let store = createStore(reducer);

export function getState() {
  return store.getState();
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_NEWS:
      return state.set('currentNews', action.payload);
    case UPDATE_BUSY:
      return state.mergeIn(['busy'], fromJS(false));
    default:
      return state;
  }
}

export function getNews() {
  get('/morning/get-news')
    .then(result => {
      updateNews(result);
      updateBusy();
    })
    .catch(err => {
      // TODO: do stuff with error later
      console.log(err);
    })
}

function updateNews(result) {
  store.dispatch({
    type: UPDATE_NEWS,
    payload: result,
  });
}


export function updateBusy() {
  store.dispatch({
    type: UPDATE_BUSY,
  });
}
