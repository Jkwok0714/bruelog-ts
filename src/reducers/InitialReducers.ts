import Helpers from 'helpers/Helpers';

const emptyDictionary = {
  hops: [],
  malts: [],
  update: 0,
  yeast: []
};
// Reducers
class InitialReducer {
  public static reducer (state = InitialReducer.initialState, action) {
    window.console.log('reducing', action);
    switch (action.type) {
      case 'changeLogin':
        return Object.assign({}, state, {loggedIn: action.login});
      case 'changeMessage':
        return Object.assign({}, state, {message: action.message});
      case 'clearMessage':
        return Object.assign({}, state, {message: null});
      case 'changeUser':
        return Object.assign({}, state, {user: action.user});
      case 'changeUserProperty':
        const updatedUser = Object.assign(state.user, action.property);
        Helpers.setUserData(updatedUser);
        return Object.assign({}, state, {user: updatedUser});
      case 'applyDictionaryData':
        return Object.assign({}, state, {dictionary: action.data});
      case 'updateDictionary':
        const dictionaryNewData = Object.assign(state.dictionary, action.data, { update: Math.random() });
        return Object.assign({}, state, { dictionary: dictionaryNewData });
      default:
        return state;
    }
  };

  private static initialState = {
    dictionary: emptyDictionary,
    loggedIn: false,
    message: null,
    user: {}
  };
}

export default InitialReducer;
