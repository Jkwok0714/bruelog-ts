import DictionaryComponent from 'components/DictionaryComponent';
import Helpers from 'helpers/Helpers';
import * as React from 'react';

interface IRecipeEntryComponentProps {
  onReturnToList: () => void;
  onSubmit: (data: any, update: boolean) => void;
  editRecipe?: any; // IRecipe
}

interface IRecipeEntryComponentState {
  editing: boolean;
  ingredients: any;
  name: string;
  description: string;
  pickingIngredients: boolean;
  style: string;
  targetbatchsize: string;
}

class RecipeEntryComponent extends React.Component<IRecipeEntryComponentProps, IRecipeEntryComponentState> {
  public state = {
    description: '',
    editing: false,
    ingredients: {},
    name: '',
    pickingIngredients: false,
    style: '',
    targetbatchsize: ''
  }

  public componentDidMount () {
    if (this.props.editRecipe) {
      let parsedIngredients;
      try {
        parsedIngredients = JSON.parse(this.props.editRecipe.ingredients);
      } catch(e) {
        parsedIngredients = {}
      }
      this.setState(Object.assign({ editing: true }, this.props.editRecipe, { ingredients: parsedIngredients }));
    }
  }

  public render () {
    const { editing, description, name, style, targetbatchsize, ingredients, pickingIngredients } = this.state;
    window.console.log(ingredients);
    return (
      <div>
        One Recipe
        {editing ? (
          <div>
            <input value={name} onChange={(e) => this.onChange('name', e)} placeholder='Name' />
            <input value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
            <input value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
            <input value={targetbatchsize} onChange={(e) => this.onChange('targetbatchsize', e)} placeholder='Target Batch Size' />

            <button onClick={this.onSubmit}>Submit</button>
            {pickingIngredients &&
              <DictionaryComponent
                modalMode={true}
                onClose={() => this.handleDictionaryDisplay(false)}
                onSelect={this.onSelect}
                selected={ingredients}
              />
            }
          </div>
        ) : (
          <div>
            <h1>{name}</h1>
            <span>{style}</span>
            <span>{description}</span>
            <span>{targetbatchsize}</span>
          </div>
        )}

        <div className='ingredient-list'>
          List here
          {!pickingIngredients && <button onClick={() => this.handleDictionaryDisplay(true)}>Open Dictionary</button>}
        </div>

        <button onClick={this.props.onReturnToList}>Back</button>
      </div>
    );
  }

  public onSelect = (type: string, id: number) => {
    const storageString = `${type}_${id}`;
    const { ingredients } = this.state;
    window.console.log('selected', storageString, ingredients);
    if (this.state.ingredients[storageString]) {
      this.setState({ ingredients: Helpers.cloneWithoutKeys(ingredients, [storageString]) });
    } else {
      this.setState({ ingredients: Object.assign({}, ingredients, { [storageString]: '0oz' }) })
    }
  }

  public handleDictionaryDisplay = (open: boolean) => {
    this.setState({ pickingIngredients: open });
  }

  private onSubmit = () => {
    const data = Helpers.cloneWithoutKeys(this.state, ['editing', 'pickingIngredients']);
    this.props.onSubmit(data, this.props.editRecipe.id !== undefined);
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default RecipeEntryComponent as React.ComponentClass<IRecipeEntryComponentProps>;
