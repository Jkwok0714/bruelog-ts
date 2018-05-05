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
        return Object.assign({}, state, {user: Object.assign(state.user, action.property)});
      default:
        return state;
    }
  };

  private static initialState = {
    loggedIn: false,
    message: null,
    user: {}
  };
}

export default InitialReducer;
