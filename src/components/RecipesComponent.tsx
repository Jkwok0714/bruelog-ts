import DataActions from 'actions/DataActions';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import RecipeEntryComponent from './subcomponents/RecipeEntryComponent';
import RecipeListComponent from './subcomponents/RecipeListComponent';

const VIEWS = {
  DETAIL: 0,
  LIST: 1
}

const RECIPE_PATH = 'api/recipes';

interface IRecipesComponentProps {
  recipes: any;
  applyRecipesData: (data: any) => void;
}

interface IRecipesComponentState {
  currentView: number;
}

class RecipesComponent extends React.Component<IRecipesComponentProps, IRecipesComponentState> {

  public state = {
    currentView: VIEWS.LIST
  };

  private defaultEdit = false;

  public componentWillMount () {
    APIService.get(RECIPE_PATH).then(res => {
      window.console.log(res);
    }).catch(err => window.console.error(err));
  }

  public render () {
    const { currentView } = this.state;

    return (
      <div>
        <h1>Recipes</h1>
        {currentView === VIEWS.LIST && <RecipeListComponent onAddRecipeClick={this.onAddRecipeClick} />}
        {currentView === VIEWS.DETAIL && <RecipeEntryComponent onReturnToList={this.onReturnToList} defaultEdit={this.defaultEdit} />}

        <button><Link to="">Back</Link></button>
      </div>
    );
  }

  private onAddRecipeClick = () => {
    this.defaultEdit = true;
    this.setState({ currentView: VIEWS.DETAIL });
  };

  private onReturnToList = () => {
    this.setState({ currentView: VIEWS.LIST });
  }

}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyRecipesData: (dictionary) => dispatch(DataActions.applyRecipesData(dictionary))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipesComponent as React.ComponentClass<IRecipesComponentProps>));
