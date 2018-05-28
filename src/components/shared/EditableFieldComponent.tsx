import * as React from 'react';

import { IoCheckmarkRound, IoEdit } from 'react-icons/lib/io';

interface IEditableFieldComponentProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: any;
}

interface IEditableFieldComponentState {
  editing: boolean;
}

class EditableFieldComponent extends React.Component<IEditableFieldComponentProps, {}> {
  public state = {
    editing: false
  }

  public render () {
    const { value, placeholder, onChange } = this.props;
    const { editing } = this.state;

    return (
      <div>
        {editing ? (
          <span>
            <form onSubmit={this.onSubmit}>
              <input value={value} onChange={onChange} placeholder={placeholder} />
              <button type='submit'><IoCheckmarkRound/></button>
            </form>
          </span>
        ) : (
          <span>
            <span>{value}</span>
            <button onClick={() => this.setEdit(true)}><IoEdit/></button>
          </span>
        )}
      </div>);
  }

  private onSubmit = (e) => {
    e.preventDefault();
    this.setEdit(false);
  }

  private setEdit = (editing: boolean) => {
    this.setState({ editing });
  }
}

export default EditableFieldComponent as React.ComponentClass<IEditableFieldComponentProps>;
