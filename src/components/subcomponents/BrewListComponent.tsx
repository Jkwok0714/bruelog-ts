import { IAPIDataResponse } from 'constants/datatypes';
import * as React from 'react';

interface IBrewListComponentProps {
  onAddBrewClick: () => void;
  onEditBrew: (brew) => void;
  onViewBrew: (brew) => void;
  brews: IAPIDataResponse;
}

class BrewListComponent extends React.Component<IBrewListComponentProps, {}> {

  public componentWillMount () {
    //
  }

  public render () {
    const { brews } = this.props;
    const arrayKeys = Object.keys(brews);

    return (<div>
      {arrayKeys.map(key => this.getRecipeBlock(brews[key]))}
      <button onClick={this.props.onAddBrewClick}>Add</button>
      </div>);
  }

  private getRecipeBlock (brewItem) {
    return (
      <div key={ brewItem.id }>
        <span>{ brewItem.name }</span>
        <span>{ brewItem.style }</span>
        <button onClick={() => this.props.onEditBrew(brewItem)}>Edit</button>
        <button onClick={() => this.props.onViewBrew(brewItem)}>View</button>
      </div>
    );
  }
}

export default BrewListComponent as React.ComponentClass<IBrewListComponentProps>;
