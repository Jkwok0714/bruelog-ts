import { IAPIDataResponse, IBrewStep, IDictionary } from 'constants/datatypes';
import * as React from 'react';
import BrewStepEntryComponent from './BrewStepEntryComponent';

interface IBrewStepManagerComponentProps {
  dictionary: IDictionary;
  section: string;
  brewSteps: IBrewStep[]; // TODO: Fix
  onAddStep: (list: string) => void;
  onEditStep: (list: string, i: number, edit: any) => void;
  onDeleteStep: (list: string, i: number) => void;
}

class BrewStepManagerComponent extends React.Component<IBrewStepManagerComponentProps, {}> {

  public componentWillMount () {
    //
  }

  public render () {
    const { brewSteps, onAddStep } = this.props;
    return (<div className='brew-steps'>
      {brewSteps.map((step: IBrewStep, i: number) => this.getBlock(step, i))}
      <button onClick={this.onAddStep}>Add</button>
      </div>);
  }

  private onAddStep = () => {
    this.props.onAddStep(this.props.section);
  }

  private onDeleteStep = (i: number) => {
    this.props.onDeleteStep(this.props.section, i);
  }

  private onDoneEditing = (index: number, data: any) => {
    this.props.onEditStep(this.props.section, index, data);
  }

  private getBlock (step: IBrewStep, i: number) {
    return (
      <div key={ 'step' + i }>
        <BrewStepEntryComponent brewStep={step} onSubmit={this.onDoneEditing} onDelete={this.onDeleteStep} index={i} dictionary={this.props.dictionary} />
      </div>
    );
  }
}

export default BrewStepManagerComponent as React.ComponentClass<IBrewStepManagerComponentProps>;
