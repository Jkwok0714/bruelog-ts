import { IBrewStep, IDictionaryEntry } from 'constants/datatypes';
import * as React from 'react';
import { IoCheckmarkRound, IoCloseRound, IoEdit, IoNavicon, IoTrashA } from 'react-icons/lib/io';

interface IBrewStepEntryComponentProps {
  onSubmit: (index: number, data: any) => void;
  brewStep: any;
  index: number;
}

interface IBrewStepEntryComponentState extends IBrewStep {
  editing: boolean;

}

// Name, flavors, desc

class BrewStepEntryComponent extends React.Component<IBrewStepEntryComponentProps, IBrewStepEntryComponentState> {
  public state = {
    amount: '',
    description: '',
    editing: false,
    gravity: '',
    ingredient: '',
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
    // const { selected, onSelect } = this.props;
    const { editing, description, amount, gravity, ingredient, time } = this.state;

    return (
      <div>
        <IoNavicon />
        {/* {selected !== undefined && <input type='checkbox' checked={selected} onChange={this.handleSelect}/>} */}
        {editing ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
              placeholder='Description'
              value={description}
              onChange={(e) => this.onChange('description', e)}
              />
              <button type='submit'><IoCheckmarkRound/></button>
            </form>
            {/* {!this.props.editing && <button onClick={this.toggleEdit}><IoCloseRound /></button>} */}
            {/* {!this.props.editing && <button onClick={this.handleDelete}><IoTrashA /></button>} */}
          </div>
        ) : (
          <div>
            <span>{description}</span>
            <button onClick={this.toggleEdit}><IoEdit/></button>
          </div>
        )}
      </div>
    );
  }

  private handleDelete = () => {
    // if (!this.props.item || !this.props.onDelete) {
    //   return;
    // }
    // const id = this.props.item.id || 0;
    // const { type } = this.props;
    //
    // this.props.onDelete(type, id);
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
