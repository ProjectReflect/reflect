import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/configureStore';
import createRoutes from './store/config/routes';
const store = createStore(window.initialStoreData);
const routes = createRoutes(store);

const app = (
  <Provider store={ store }>
    { routes }
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
