import * as React from 'react';
import * as ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import './index.css';

import InitialReducer from './reducers/InitialReducers';

const store = createStore(InitialReducer.reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
