import DictionaryComponent from 'components/DictionaryComponent';
import { IDictionary, IRecipe, IUser } from 'constants/datatypes';
import Helpers from 'helpers/Helpers';
import * as React from 'react';
import RecipeCalculatorComponent from './RecipeCalculatorComponent';

import EditableFieldComponent from '../shared/EditableFieldComponent';

interface IRecipeEntryComponentProps {
  dictionary: IDictionary; // IDictionary;
  onReturnToList: () => void;
  onSubmit: (data: IRecipe, update: boolean) => void;
  editRecipe?: IRecipe; // IRecipe
  viewRecipe?: IRecipe;
}

interface IRecipeEntryComponentState {
  editing: boolean;
  ingredients: any;
  name: string;
  description: string;
  pickingIngredients: boolean;
  style: string;
  targetbatchsize: string;
  calculator: boolean;
}

class RecipeEntryComponent extends React.Component<IRecipeEntryComponentProps, IRecipeEntryComponentState> {
  public state = {
    calculator: false,
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
      this.setState(Object.assign({ editing: true }, this.props.editRecipe as any ));
      this.numID = this.props.editRecipe.id as number;
    } else if (this.props.viewRecipe) {
      this.setState(Object.assign(this.state, this.props.viewRecipe as any));
      this.numID = this.props.viewRecipe.id as number;
    }
  }

  public render () {
    const { calculator, editing, description, name, style, targetbatchsize, ingredients, pickingIngredients } = this.state;
    const { dictionary } = this.props;

    return (
      <div className='recipe-entry-wrapper'>
        <h2>{name}</h2>
        <div>
          <h3>General</h3>
          <EditableFieldComponent value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
          <EditableFieldComponent value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
          <EditableFieldComponent value={targetbatchsize} onChange={(e) => this.onChange('targetbatchsize', e)} placeholder='Target Batch Size' />
        </div>

        <div className='ingredient-list'>
          <h3>Ingredients</h3>
          {editing ? (
            <span>
              {!pickingIngredients ? (
                <button onClick={() => this.handleDictionaryDisplay(true)}>Pick Ingredients</button>
              ) : (
                <DictionaryComponent
                  modalMode={true}
                  onClose={() => this.handleDictionaryDisplay(false)}
                  onSelect={this.onSelect}
                  selected={ingredients}
                />
              )
            }
            <button onClick={this.onDoneEdit}>Done Editing Ingredients</button>
            </span>
          ) : (
            <button onClick={this.onEdit}>Edit Ingredients</button>
          )}
          {Object.keys(ingredients).map((ingredientKey, i) => {
            const ingredientName = Helpers.parseStorageString(ingredientKey, dictionary);

            return (
              <div className='list-entry' key={ingredientKey}>
                <span>{ingredientName}</span>
                {editing ? (<input value={ingredients[ingredientKey]} onChange={(e) => this.handleAmountChange(ingredientKey, e)} />) : (<span>{ingredients[ingredientKey]}</span>)}
              </div>
            );
          })}
        </div>
        <button onClick={this.onSubmit}>Submit Any Changes</button><br />
        {!editing && <button onClick={() => this.toggleCalculator(true)}>Calculator</button>}
        <button onClick={this.props.onReturnToList}>Back</button>
        {calculator && <RecipeCalculatorComponent ingredients={ingredients} targetbatchsize={targetbatchsize} dictionary={dictionary} onClose={() => this.toggleCalculator(false)} />}
      </div>
    );
  }

  public onSelect = (type: string, id: number) => {
    const storageString = Helpers.getStorageString(type, id);
    const { ingredients } = this.state;
    if (this.state.ingredients[storageString]) {
      const setTo = Object.assign({}, ingredients);
      delete setTo[storageString];
      window.console.log('remove', storageString, 'get', setTo);
      this.setState({ ingredients: setTo });
    } else {
      this.setState({ ingredients: Object.assign({}, ingredients, { [storageString]: '0oz' }) })
    }
  }

  public handleDictionaryDisplay = (open: boolean) => {
    this.setState({ pickingIngredients: open });
  }

  private onSubmit = () => {
    const data = Helpers.cloneWithoutKeys(this.state, ['editing', 'pickingIngredients', 'calculator']);
    this.props.onSubmit(data, this.numID > 0);
    this.setState({ editing: false });
  }

  private toggleCalculator = (state: boolean) => {
    this.setState({ calculator: state });
  };

  // These can be combined
  private onEdit = () => {
    this.setState({ editing: true });
  };

  private onDoneEdit = () => {
    this.setState({ editing: false });
  }

  private handleAmountChange = (ingredientKey: string, e: React.FormEvent<HTMLInputElement>) => {
    const { ingredients } = this.state;
    this.setState({ ingredients: Object.assign({}, ingredients, { [ingredientKey]: e.currentTarget.value })});
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default RecipeEntryComponent as React.ComponentClass<IRecipeEntryComponentProps>;
