import { IAPIDataResponse } from 'constants/datatypes';
import * as React from 'react';

interface IRecipeListComponentProps {
  onAddRecipeClick: () => void;
  onEditRecipe: (recipe) => void;
  onViewRecipe: (recipe) => void;
  recipes: IAPIDataResponse;
}

class RecipeListComponent extends React.Component<IRecipeListComponentProps, {}> {

  public componentWillMount () {
    //
  }

  public render () {
    const { recipes } = this.props;
    const arrayKeys = Object.keys(recipes);

    return (<div>
      {arrayKeys.map(key => this.getRecipeBlock(recipes[key]))}
      <button onClick={this.props.onAddRecipeClick}>Add</button>
      </div>);
  }

  private getRecipeBlock (recipeItem) {
    return (
      <div key={ recipeItem.id }>
        <span>{ recipeItem.name }</span>
        <span>{ recipeItem.style }</span>
        {/* <button onClick={() => this.props.onEditRecipe(recipeItem)}>Edit</button> */}
        <button onClick={() => this.props.onViewRecipe(recipeItem)}>View</button>
      </div>
    );
  }
}

export default RecipeListComponent as React.ComponentClass<IRecipeListComponentProps>;
