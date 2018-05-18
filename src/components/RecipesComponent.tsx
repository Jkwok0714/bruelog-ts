import DataActions from 'actions/DataActions';
import { IAPIResponse, IDictionary } from 'constants/datatypes';
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
  dictionary: IDictionary;
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
  private viewSelection: any = null;

  public componentWillMount () {
    this.getRecipeData();
  }

  public render () {
    const { currentView } = this.state;
    const { dictionary } = this.props;

    return (
      <div>
        <h1>Recipes</h1>
        {currentView === VIEWS.LIST && <RecipeListComponent recipes={this.props.recipes} onAddRecipeClick={this.onAddRecipeClick} onEditRecipe={this.onEditRecipe} onViewRecipe={this.onViewRecipe} />}
        {currentView === VIEWS.DETAIL && <RecipeEntryComponent dictionary={dictionary} onSubmit={this.onSubmit} onReturnToList={this.onReturnToList} viewRecipe={this.viewSelection} editRecipe={this.defaultEdit} />}

        {currentView === VIEWS.LIST && <button><Link to="">Back</Link></button>}
      </div>
    );
  }

  public onSubmit = (data: any, update: boolean) => {
    // const stringData = Object.assign(data, { ingredients: data.ingredients });
    if (update) {
      APIService.put(RECIPE_PATH, data).then(res => {
        // this.onReturnToList(true);
        this.getRecipeData();
      });
    } else {
      APIService.post(RECIPE_PATH, data).then(res => {
        // this.onReturnToList(true);
        this.getRecipeData();
      });
    }
  }

  public onEditRecipe = (recipe) => {
    this.viewSelection = null;
    this.defaultEdit = recipe;
    this.setState({ currentView: VIEWS.DETAIL });
  };

  public onViewRecipe = (recipe) => {
    this.defaultEdit = null;
    this.viewSelection = recipe;
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
    dictionary: state.dictionary,
    recipes: state.recipes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyRecipesData: (dictionary) => dispatch(DataActions.applyRecipesData(dictionary))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipesComponent as React.ComponentClass<IRecipesComponentProps>));
