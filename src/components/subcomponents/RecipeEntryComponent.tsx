import DictionaryComponent from 'components/DictionaryComponent';
import Helpers from 'helpers/Helpers';
import * as React from 'react';

interface IRecipeEntryComponentProps {
  dictionary: any; // IDictionary;
  onReturnToList: () => void;
  onSubmit: (data: any, update: boolean) => void;
  editRecipe?: any; // IRecipe
  viewRecipe?: any;
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

  private numID: number = -1;

  public componentDidMount () {
    if (this.props.editRecipe) {
      this.setState(Object.assign({ editing: true }, this.props.editRecipe ));
      this.numID = this.props.editRecipe.id;
    } else if (this.props.viewRecipe) {
      this.setState(Object.assign(this.state, this.props.viewRecipe));
      this.numID = this.props.viewRecipe.id;
    }
  }

  public render () {
    const { editing, description, name, style, targetbatchsize, ingredients, pickingIngredients } = this.state;
    const { dictionary } = this.props;

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
            {!pickingIngredients ? (
              <button onClick={() => this.handleDictionaryDisplay(true)}>Edit Ingredients</button>
            ) : (
              <DictionaryComponent
                modalMode={true}
                onClose={() => this.handleDictionaryDisplay(false)}
                onSelect={this.onSelect}
                selected={ingredients}
              />
            )}
          </div>
        ) : (
          <div>
            <h2>{name}</h2>
            <span>{style}</span>
            <span>{description}</span>
            <span>{targetbatchsize}</span>
            <button onClick={this.onEdit}>Edit</button>
          </div>
        )}
        <div className='ingredient-list'>
          {Object.keys(ingredients).map((ingredientKey, i) => {
            const split = ingredientKey.split('_');
            return (
              <div className='list-entry' key={ingredientKey}>
                <span>{dictionary[split[0]][split[1]].name}</span>
                {editing ? (<input value={ingredients[ingredientKey]} onChange={(e) => this.handleAmountChange(ingredientKey, e)} />) : (<span>{ingredients[ingredientKey]}</span>)}
              </div>
            );
          })}
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
    this.props.onSubmit(data, this.numID !== -1);
    this.setState({ editing: false });
  }

  private onEdit = () => {
    this.setState({ editing: true });
  };

  private handleAmountChange = (ingredientKey: string, e: React.FormEvent<HTMLInputElement>) => {
    const { ingredients } = this.state;
    this.setState({ ingredients: Object.assign({}, ingredients, { [ingredientKey]: e.currentTarget.value })});
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default RecipeEntryComponent as React.ComponentClass<IRecipeEntryComponentProps>;
