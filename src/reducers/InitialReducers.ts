// Reducers
class InitialReducer {
  public static reducer (state = InitialReducer.initialState, action) {
    switch (action.type) {
      case 'changeLogin':
      // window.alert('Change dat arthur to ' + action.arthur);
      return Object.assign({}, state, {loggedIn: action.login});
      default:
      return state;
    }
  };

  private static initialState = {
    loggedIn: false
  };
}

export default InitialReducer;
