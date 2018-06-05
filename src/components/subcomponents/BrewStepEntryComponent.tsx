import DictionaryComponent from 'components/DictionaryComponent';
import { IBrewStep, IDictionary, IDictionaryEntry } from 'constants/datatypes';
import Helpers from 'helpers/Helpers';
import * as React from 'react';
import { IoCheckmarkRound, IoCloseRound, IoEdit, IoNavicon, IoTrashA } from 'react-icons/lib/io';

interface IBrewStepEntryComponentProps {
  onSubmit: (index: number, data: any) => void;
  onDelete: (i: number) => void;
  brewStep: any;
  index: number;
  dictionary: IDictionary;
}

interface IBrewStepEntryComponentState extends IBrewStep {
  editing: boolean;
  pickingIngredients: boolean;
}

// Name, flavors, desc

class BrewStepEntryComponent extends React.Component<IBrewStepEntryComponentProps, IBrewStepEntryComponentState> {
  public state = {
    amount: '',
    description: '',
    editing: false,
    gravity: '',
    ingredient: '',
    pickingIngredients: false,
    temperature: '',
    time: ''
  }

  public componentDidMount () {
    // If Empty, edit
    if (this.props.brewStep.description === '' && this.props.brewStep.ingredient === '') {
      this.setState({ editing: true });
    } else {
      this.setState(Object.assign({}, this.state, this.props.brewStep));
    }
  }

  public componentWillReceiveProps () {
    //
  }

  public render () {
    const { editing, description, amount, gravity, ingredient, temperature, time, pickingIngredients } = this.state;
    const { dictionary } = this.props;

    const ingredientName = Helpers.parseStorageString(ingredient, dictionary);
    const hasIngredient = ingredient !== '';

    return (
      <div>
        <IoNavicon />
        {/* {selected !== undefined && <input type='checkbox' checked={selected} onChange={this.handleSelect}/>} */}
        {editing ? (
          <div>
            {/* <span /> */}
            <span>Ingredient:{ingredientName}</span>
            {!pickingIngredients ? (
              <button onClick={() => this.handleDictionaryDisplay(true)}>Pick Ingredients</button>
            ) : (
              <DictionaryComponent
                modalMode={true}
                onClose={() => this.handleDictionaryDisplay(false)}
                onSelect={this.onSelect}
                selected={ingredient}
              />
            )}
            <form onSubmit={this.handleSubmit}>
              <input
              placeholder='Time'
              value={time}
              onChange={(e) => this.onChange('time', e)}
              />
              {hasIngredient && <input
              placeholder='Amount'
              value={amount}
              onChange={(e) => this.onChange('amount', e)}
              />}
              <input
              placeholder='Temperature'
              value={temperature}
              onChange={(e) => this.onChange('temperature', e)}
              />
              <input
              placeholder='Specific Gravity'
              value={gravity}
              onChange={(e) => this.onChange('gravity', e)}
              />
              <input
              placeholder='Description'
              value={description}
              onChange={(e) => this.onChange('description', e)}
              />
              <button type='submit'><IoCheckmarkRound/></button>
            </form>
            <button onClick={this.toggleEdit}><IoCloseRound /></button>
            <button onClick={this.handleDelete}><IoTrashA /></button>
          </div>
        ) : (
          <div>
            <span>{time}</span>
            <span>Ingredient:{ingredientName}</span>
            {hasIngredient && <span>{amount}</span>}
            <span>{temperature}</span>
            <span>{gravity}</span>
            <span>{description}</span>
            <button onClick={this.toggleEdit}><IoEdit/></button>
          </div>
        )}
      </div>
    );
  }

  public onSelect = (type: string, id: number) => {
    const storageString = Helpers.getStorageString(type, id);
    this.setState({ ingredient: storageString });
    this.handleDictionaryDisplay(false);
  }

  public handleDictionaryDisplay = (open: boolean) => {
    this.setState({ pickingIngredients: open });
  }

  private handleDelete = () => {
    this.props.onDelete(this.props.index);
  }

  private handleSelect = () => {
    // const { onSelect, type, item } = this.props;
    // if (!onSelect || !item) {
    //   window.console.log('Missing onSelect or item', onSelect, item);
    //   return;
    // }
    // onSelect(type, item.id || -1);
  }

  private toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  private handleSubmit = (e) => {
    e.preventDefault();

    const { amount, description, gravity, ingredient, temperature, time } = this.state;

    this.props.onSubmit(this.props.index, {
      amount,
      description,
      gravity,
      ingredient,
      temperature,
      time
    });
    this.setState({ editing: false });
  }

  private onChange (key: string, e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default BrewStepEntryComponent as React.ComponentClass<IBrewStepEntryComponentProps>;
