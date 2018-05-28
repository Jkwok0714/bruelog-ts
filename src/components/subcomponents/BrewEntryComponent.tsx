import DictionaryComponent from 'components/DictionaryComponent';
import { IBrewStep } from 'constants/datatypes';
import Helpers from 'helpers/Helpers';
import * as React from 'react';
import BrewStepManager from './BrewStepManager';

interface IBrewEntryComponentProps {
  dictionary: any; // IDictionary;
  onReturnToList: () => void;
  onSubmit: (data: any, update: boolean) => void;
  editBrew?: any; // IRecipe
  viewBrew?: any;
}

interface IBrewEntryComponentState {
  editing: boolean;
  pickingIngredients: boolean;

  name: string;
  style: string;
  image: string;
  description: string;
  brewdate: string;
  bottledate: string;
  mash: IBrewStep[];
  boil: IBrewStep[];
  fermentation: IBrewStep[];
  lageringtemp: string;
  length: string; // Lagering length
  bottling: string;
  tastingnote: string;
  archived: number;
  recipeid: number;
  attachments: string;
  notes: string;
  seriesid: number;
  token?: string;
  public: number;
  targetbatchsize: string;
}

class BrewEntryComponent extends React.Component<IBrewEntryComponentProps, IBrewEntryComponentState> {
  public state = {
    archived: 0,
    attachments: '',
    boil: [],
    bottledate: '',
    bottling: '',
    brewdate: '',
    description: '',
    editing: false,
    fermentation: [],
    fg: '',
    image: '',
    lageringtemp: '',
    length: '',
    mash: [],
    name: '',
    notes: '',
    og: '',
    pickingIngredients: false,
    public: 0,
    recipeid: 0,
    seriesid: 0,
    style: '',
    targetbatchsize: '',
    tastingnote: '',
    token: ''
  }

  private numID: number = -1;

  public componentDidMount () {
    if (this.props.editBrew) {
      this.setState(Object.assign({ editing: true }, this.props.editBrew ));
      this.numID = this.props.editBrew.id;
    } else if (this.props.viewBrew) {
      this.setState(Object.assign(this.state, this.props.viewBrew));
      this.numID = this.props.viewBrew.id;
    }
  }

  public render () {
    const { editing, description, name, style, targetbatchsize, pickingIngredients } = this.state;
    const { dictionary } = this.props;

    return (
      <div className='recipe-entry-wrapper'>
        <h2>{name}</h2>
        {editing ? (
          <div>
            <input value={name} onChange={(e) => this.onChange('name', e)} placeholder='Name' />
            <input value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
            <input value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
            <input value={targetbatchsize} onChange={(e) => this.onChange('targetbatchsize', e)} placeholder='Target Batch Size' />

            {/* {!pickingIngredients ? (
              <button onClick={() => this.handleDictionaryDisplay(true)}>Edit Ingredients</button>
            ) : (
              <DictionaryComponent
                modalMode={true}
                onClose={() => this.handleDictionaryDisplay(false)}
                onSelect={this.onSelect}
                selected={[]}
              />
            )} */}
          </div>
        ) : (
          <div>
            <h3>General</h3>
            <span>{style}</span>
            <span>{description}</span>
            <span>{targetbatchsize}</span>
            <button onClick={this.onEdit}>Edit</button>
          </div>
        )}
        {editing && <button onClick={this.onSubmit}>Submit</button>}
        <button onClick={this.props.onReturnToList}>Back</button>
      </div>
    );
  }

  public onSelect = (type: string, id: number) => {
    // const storageString = `${type}_${id}`;
    // const { ingredients } = this.state;
    // if (this.state.ingredients[storageString]) {
    //   const setTo = Object.assign({}, ingredients);
    //   delete setTo[storageString];
    //   window.console.log('remove', storageString, 'get', setTo);
    //   this.setState({ ingredients: setTo });
    // } else {
    //   this.setState({ ingredients: Object.assign({}, ingredients, { [storageString]: '0oz' }) })
    // }
  }

  public handleDictionaryDisplay = (open: boolean) => {
    this.setState({ pickingIngredients: open });
  }

  private onSubmit = () => {
    const data = Helpers.cloneWithoutKeys(this.state, ['editing', 'pickingIngredients', 'calculator']);
    this.props.onSubmit(data, this.numID > 0);
    this.setState({ editing: false });
  }

  private onEdit = () => {
    this.setState({ editing: true });
  };

  private handleAmountChange = (ingredientKey: string, e: React.FormEvent<HTMLInputElement>) => {
    // const { ingredients } = this.state;
    // this.setState({ ingredients: Object.assign({}, ingredients, { [ingredientKey]: e.currentTarget.value })});
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default BrewEntryComponent as React.ComponentClass<IBrewEntryComponentProps>;
