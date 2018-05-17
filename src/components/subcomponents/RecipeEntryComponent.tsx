import Helpers from 'helpers/Helpers';
import * as React from 'react';

interface IRecipeEntryComponentProps {
  onReturnToList: () => void;
  onSubmit: (data: any, update: boolean) => void;
  editRecipe?: any; // IRecipe
}

interface IRecipeEntryComponentState {
  editing: boolean;
  ingredients: any[];
  name: string;
  description: string;
  style: string;
  targetbatchsize: string;
}

class RecipeEntryComponent extends React.Component<IRecipeEntryComponentProps, IRecipeEntryComponentState> {
  public state = {
    description: '',
    editing: false,
    ingredients: [],
    name: '',
    style: '',
    targetbatchsize: ''
  }

  public componentDidMount () {
    if (this.props.editRecipe) {
      this.setState(Object.assign({ editing: true }, this.props.editRecipe));
    }
  }

  public render () {
    const { editing, description, name, style, targetbatchsize } = this.state;
    return (
      <div>
        One Recipe
        {editing ? (
          <div>
            <input value={name} onChange={(e) => this.onChange('name', e)} placeholder='Name' />
            <input value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
            <input value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
            <input value={targetbatchsize} onChange={(e) => this.onChange('targetbatchsize', e)} placeholder='Target Batch Size' />
          </div>
        ) : (
          <div>
            <h1>{name}</h1>
            <span>{style}</span>
            <span>{description}</span>
            <span>{targetbatchsize}</span>
          </div>
        )}

        <button onClick={this.onSubmit}>Submit</button>

        <button onClick={this.props.onReturnToList}>Cancel</button>
      </div>
    );
  }

  private onSubmit = () => {
    const data = Helpers.cloneWithoutKeys(this.state, ['editing']);
    this.props.onSubmit(data, this.props.editRecipe.id !== undefined);
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default RecipeEntryComponent as React.ComponentClass<IRecipeEntryComponentProps>;
