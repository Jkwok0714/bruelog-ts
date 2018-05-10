import InitialReducer from 'reducers/InitialReducers';
import { createStore } from 'redux';

const store = createStore(InitialReducer.reducer);

(window as any).store = store;

export default store;
