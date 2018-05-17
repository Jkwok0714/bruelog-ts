import DataActions from 'actions/DataActions';
import { IAPIResponse } from 'constants/datatypes';
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

  private defaultEdit: any = null;

  public componentWillMount () {
    this.getRecipeData();
  }

  public render () {
    const { currentView } = this.state;

    return (
      <div>
        <h1>Recipes</h1>
        {currentView === VIEWS.LIST && <RecipeListComponent recipes={this.props.recipes} onAddRecipeClick={this.onAddRecipeClick} onEditRecipe={this.onEditRecipe} />}
        {currentView === VIEWS.DETAIL && <RecipeEntryComponent onSubmit={this.onSubmit} onReturnToList={this.onReturnToList} editRecipe={this.defaultEdit} />}

        <button><Link to="">Back</Link></button>
      </div>
    );
  }

  public onSubmit = (data: any, update: boolean) => {
    const stringData = Object.assign(data, { ingredients: JSON.stringify(data.ingredients) });
    if (update) {
      APIService.put(RECIPE_PATH, stringData).then(res => {
        this.onReturnToList(true);
      });
    } else {
      APIService.post(RECIPE_PATH, stringData).then(res => {
        this.onReturnToList(true);
      });
    }
  }

  public onEditRecipe = (recipe) => {
    this.defaultEdit = recipe;
    this.setState({ currentView: VIEWS.DETAIL });
  };

  private getRecipeData = () => {
    APIService.get(RECIPE_PATH).then(res => {
      this.props.applyRecipesData((res as IAPIResponse).data);
    }).catch(err => window.console.error(err));
  }

  private onAddRecipeClick = () => {
    this.defaultEdit = {};
    this.setState({ currentView: VIEWS.DETAIL });
  };

  private onReturnToList = (update = false) => {
    if (update) {
      this.getRecipeData();
    }
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
