import DictionaryComponent from 'components/DictionaryComponent';
import { IBrewStep } from 'constants/datatypes';
import Helpers from 'helpers/Helpers';
import * as React from 'react';
import BrewStepManagerComponent from './BrewStepManagerComponent';

import EditableFieldComponent from '../shared/EditableFieldComponent';

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

  [x: string]: any;
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
    const { editing, description, name, style, targetbatchsize, pickingIngredients, og, fg, tastingnote, notes, lageringtemp, length, mash } = this.state;
    const { dictionary } = this.props;

    return (
      <div className='brew-entry-wrapper'>
        <h2>{name}</h2>
        <div className='brew-section'>
          <h3>Summary</h3>
          <EditableFieldComponent value={name} onChange={(e) => this.onChange('name', e)} placeholder='Name' />
          <EditableFieldComponent value={style} onChange={(e) => this.onChange('style', e)} placeholder='Style' />
          <EditableFieldComponent value={description} onChange={(e) => this.onChange('description', e)} placeholder='Description' />
          <EditableFieldComponent value={targetbatchsize} onChange={(e) => this.onChange('targetbatchsize', e)} placeholder='Target batch size' />
        </div>
        <div className='brew-section'>
          <h3>Mash/Sparge</h3>
          <BrewStepManagerComponent dictionary={dictionary} section='mash' brewSteps={mash} onAddStep={this.onAddStep} onEditStep={this.onEditStep}/>
        </div>
        <div className='brew-section'>
          <h3>Boil</h3>
        </div>
        <div className='brew-section'>
          <h3>Fermentation</h3>
          <EditableFieldComponent value={lageringtemp} onChange={(e) => this.onChange('lageringtemp', e)} placeholder='Lagering temperature' />
          <EditableFieldComponent value={length} onChange={(e) => this.onChange('length', e)} placeholder='Lagering duration' />
        </div>
        <div className='brew-section'>
          <h3>Bottling/Kegging</h3>
          <EditableFieldComponent value={og} onChange={(e) => this.onChange('og', e)} placeholder='Original gravity' />
          <EditableFieldComponent value={fg} onChange={(e) => this.onChange('fg', e)} placeholder='Final gravity' />
        </div>
        <div className='brew-section'>
          <h3>Tasting/Finish</h3>
          <EditableFieldComponent value={tastingnote} onChange={(e) => this.onChange('tastingnote', e)} placeholder='Tasting notes' />
          <button onClick={this.archiveEntry}>Archive</button>
        </div>
        <div className='brew-section'>
          <h3>Notes</h3>
          <EditableFieldComponent value={notes} onChange={(e) => this.onChange('notes', e)} placeholder='Additional notes' />
        </div>
        <div className='brew-section'>
          <h3>Metrics</h3>
        </div>
        <button onClick={this.onSubmit}>Submit</button>
        <button onClick={this.props.onReturnToList}>Back</button>
      </div>
    );
  }

  public onSelect = (target: string, type: string, id: number) => {
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

  private onAddStep = (list: string) => {
    const newBrewStep = {
      amount: '',
      description: '',
      gravity: '',
      ingredient: '',
      temperature: '',
      time: ''
    };
    window.console.log(list, this.state[list], newBrewStep);

    this.setState({ [list]: this.state[list].concat([newBrewStep]) });
  }

  private onEditStep = (list: string, i: number, edit: any) => {
    const newList = this.state[list];
    newList[i] = edit;
    this.setState({ [list]: newList });
  }

  private onDeleteStep = (list: string, i: number, edit) => {
    //
  }

  private archiveEntry = () => {
    // Set archived
  }

  private onSubmit = () => {
    const data = Helpers.cloneWithoutKeys(this.state, ['editing', 'pickingIngredients']);
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
