import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import RecipeEntryComponent from './subcomponents/RecipeEntryComponent';
import RecipeListComponent from './subcomponents/RecipeListComponent';

const VIEWS = {
  ADJUSTMENT: 2,
  DETAIL: 0,
  LIST: 1
}

interface IRecipesComponentState {
  currentView: number;
}

class RecipesComponent extends React.Component<{}, IRecipesComponentState> {

  public state = {
    currentView: VIEWS.LIST
  };

  public render () {
    const { currentView } = this.state;

    return (
      <div>
        <h1>Recipes</h1>
        {currentView === VIEWS.LIST && <RecipeListComponent />}

        <button><Link to="">Back</Link></button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    user: state.user
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     applyDictionaryData: (dictionary) => dispatch(DataActions.applyDictionaryData(dictionary)),
//     updateDictionary: (dictionary) => dispatch(DataActions.updateDictionary(dictionary))
//   };
// }

export default withRouter(connect(mapStateToProps)(RecipesComponent as React.ComponentClass<any>));
