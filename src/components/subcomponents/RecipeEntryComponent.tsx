import * as React from 'react';

interface IRecipeEntryComponentProps {
  onReturnToList: () => void;
  defaultEdit?: boolean;
}

interface IRecipeEntryComponentState {
  editing: boolean;
  name: string;
  description: string;
  style: string;
  targetBatchSize: string;
}

class RecipeEntryComponent extends React.Component<IRecipeEntryComponentProps, IRecipeEntryComponentState> {
  public state = {
    description: '',
    editing: false,
    name: '',
    style: '',
    targetBatchSize: ''
  }

  public componentDidMount () {
    if (this.props.defaultEdit) {
      this.setState({ editing: true });
    }
  }

  public render () {
    const { editing, description, name, style, targetBatchSize } = this.state;
    return (
      <div>
        One Recipe
        {editing ? (
          <div>
            <input value={name} onChange={(e) => this.onChange('name', e)} placeholder='Name' />
            <input value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
            <input value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
            <input value={targetBatchSize} onChange={(e) => this.onChange('targetBatchSize', e)} placeholder='Target Batch Size' />
          </div>
        ) : (
          <div>
            <h1>{name}</h1>
            <span>{style}</span>
            <span>{description}</span>
            <span>{targetBatchSize}</span>
          </div>
        )}

        <button onClick={this.props.onReturnToList}>Cancel</button>
      </div>
    );
  }

  private onChange (key: string, e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default RecipeEntryComponent as React.ComponentClass<IRecipeEntryComponentProps>;
