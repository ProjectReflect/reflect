import { fromJS } from 'immutable';
import { createStore } from 'redux';
import { get } from '../../services/Fetch';

const UPDATE_CUR_WEATHER = '@@REFLECT/UPDATE_CUR_WEATHER';
const UPDATE_BUSY = '@@REFLECT/UPDATE_BUSY';

const initalState = fromJS({
  currentWeather: {
    curTemp: null,
    condition: null,
    loc: null,
    degreeType: 'C',
  },
  busy: true,
});

let store = createStore(reducer)

export function getState() {
  return store.getState();
};

export function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case UPDATE_CUR_WEATHER:
      return state.mergeIn(['currentWeather'], fromJS({
        curTemp: action.payload.curTemp,
        condition: action.payload.condition,
        loc: action.payload.loc,
        degreeType: action.payload.degreeType,
      }));

    case UPDATE_BUSY:
      return state.mergeIn(['busy'], fromJS(false));

    default:
      return state;
  }
}

export function getWeather() {
  get('/morning/get-weather')
    .then(result => {
      updateCurWeather(result);
      updateBusy();
    })
    .catch(err => {
      // TODO: set up global error later
      console.log(err);
    });
}

export function updateBusy() {
  store.dispatch({
    type: UPDATE_BUSY,
  });
}

function updateCurWeather(result) {
  store.dispatch ({
    type: UPDATE_CUR_WEATHER,
    payload: result,
  });
}
