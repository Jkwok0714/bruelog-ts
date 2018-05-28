import { IAPIDataResponse, IBrewStep, IDictionary } from 'constants/datatypes';
import * as React from 'react';

interface IBrewStepManagerComponentProps {
  dictionary: IDictionary;
  section: string;
  brewSteps: IBrewStep[]; // TODO: Fix
  onAddStep: () => void;
  onEditStep: (step: IBrewStep, index: number) => void;
}

class BrewStepManagerComponent extends React.Component<IBrewStepManagerComponentProps, {}> {

  public componentWillMount () {
    //
  }

  public render () {
    const { brewSteps, onAddStep } = this.props;
    return (<div className='brew-steps'>
      {brewSteps.map((step: IBrewStep, i: number) => this.getBlock(step, i))}
      <button onClick={this.props.onAddStep}>Add</button>
      </div>);
  }

  private getBlock (step: IBrewStep, i: number) {
    return (
      <div key={ 'step' + i }>
        <span>{ step.time }</span>
        <span>{ step.ingredient }</span>
      </div>
    );
  }
}

export default BrewStepManagerComponent as React.ComponentClass<IBrewStepManagerComponentProps>;
