import InitialReducer from 'reducers/InitialReducers';
import { createStore } from 'redux';

const store = createStore(InitialReducer.reducer);

export default store;
