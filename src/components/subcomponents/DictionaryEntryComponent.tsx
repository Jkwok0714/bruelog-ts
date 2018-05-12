import * as React from 'react';

interface IDictionaryEntryComponentProps {
  onSubmit: (data: object) => void;
  type: string;

  item?: object;
  editing?: boolean;
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
    const { editing, name, description, flavors } = this.state;

    return (
      <div>
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
