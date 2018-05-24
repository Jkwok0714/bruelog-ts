import { IDictionaryEntry } from 'constants/datatypes';
import * as React from 'react';

interface IDictionaryEntryComponentProps {
  onSubmit: (data: object) => void;
  type: string;

  onDelete?: (type: string, id: number) => void;
  item?: IDictionaryEntry;
  editing?: boolean;
  selected?: boolean;
  onSelect?: (type: string, id: number) => void;
}

interface IDictionaryEntryComponentState {
  editing: boolean;

  name: string;
  description: string;
  flavors: string;
}

// Name, flavors, desc

class DictionaryEntryComponent extends React.Component<IDictionaryEntryComponentProps, IDictionaryEntryComponentState> {
  public state = {
    description: '',
    editing: false,
    flavors: '',
    name: ''
  }

  public componentDidMount () {
    if (this.props.item) {
      const { description, flavors, name } = (this.props.item as any);
      this.setState({
        description,
        flavors,
        name
      });
    }
    if (this.props.editing) {
      this.setState({ editing: this.props.editing });
    }
  }

  public render () {
    const { selected, onSelect } = this.props;
    const { editing, name, description, flavors } = this.state;

    return (
      <div>
        {selected !== undefined && <input type='checkbox' checked={selected} onChange={this.handleSelect}/>}
        {editing ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
              placeholder='Name'
              value={name}
              onChange={(e) => this.onChange('name', e)}
              />
              <input
              placeholder='Description'
              value={description}
              onChange={(e) => this.onChange('description', e)}
              />
              <input
              placeholder='Flavors (seperate with commas)'
              value={flavors}
              onChange={(e) => this.onChange('flavors', e)}
              />
              <input type='submit' value='Submit' />
            </form>
            {!this.props.editing && <button onClick={this.toggleEdit}>Cancel</button>}
            {!this.props.editing && <button onClick={this.handleDelete}>Delete</button>}
          </div>
        ) : (
          <div>
            <span>{name}</span>
            <span>{description}</span>
            <span>{flavors}</span>
            <button onClick={this.toggleEdit}>Edit</button>
          </div>
        )}
      </div>
    );
  }

  private handleDelete = () => {
    if (!this.props.item || !this.props.onDelete) {
      return;
    }
    const id = this.props.item.id || 0;
    const { type } = this.props;

    this.props.onDelete(type, id);
  }

  private handleSelect = () => {
    const { onSelect, type, item } = this.props;
    if (!onSelect || !item) {
      window.console.log('Missing onSelect or item', onSelect, item);
      return;
    }
    onSelect(type, item.id || -1);
  }

  private toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  private handleSubmit = (e) => {
    e.preventDefault();

    const { name, description, flavors } = this.state;
    const itemID = this.props.item ? (this.props.item as any).id : null;

    this.props.onSubmit({
      description,
      flavors,
      id: itemID,
      name,
      type: this.props.type
    });
    this.setState({ editing: false });
  }

  private onChange (key: string, e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [key as any]: e.currentTarget.value });
  }
}

export default DictionaryEntryComponent as React.ComponentClass<IDictionaryEntryComponentProps>;
