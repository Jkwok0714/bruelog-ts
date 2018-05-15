import * as React from 'react';

interface IRecipeListComponentProps {
  onAddRecipeClick: () => void;
}

class RecipeListComponent extends React.Component<IRecipeListComponentProps, {}> {

  public componentWillMount () {
    //
  }

  public render () {
    return (<div>
      Many Recipe
      <button onClick={this.props.onAddRecipeClick}>Add</button>
      </div>);
  }
}

export default RecipeListComponent as React.ComponentClass<IRecipeListComponentProps>;
