import { IAPIDataResponse, IDisassembledIngredient } from 'constants/datatypes';
import Helpers from 'helpers/Helpers';
import * as React from 'react';

interface IRecipeCalculatorComponentProps {
  dictionary: any;
  ingredients: any;
  targetbatchsize: string;
  onClose: () => void;
}

interface IRecipeCalculatorComponentState {
  disassembledIngredients: IDisassembledIngredient[];
  smallerBatchSize: string;
  ratio: number;
}

class RecipeCalculatorComponent extends React.Component<IRecipeCalculatorComponentProps, IRecipeCalculatorComponentState> {

  public state = {
    disassembledIngredients: [],
    ratio: 1,
    smallerBatchSize: ''
  };

  private minRatiosStack = [1];

  public componentWillMount () {
    const { dictionary, ingredients, targetbatchsize } = this.props;
    const ratio = 1;
    const smallerBatchSize = targetbatchsize;
    const disassembledIngredients = Object.keys(ingredients).map(ingredientKey => {
      const split = ingredientKey.split('_');
      return {
        amount: ingredients[ingredientKey],
        limit: ingredients[ingredientKey],
        name: dictionary[split[0]][split[1]].name,
        ratio: 1,
        total: ingredients[ingredientKey]
      };
    });

    this.setState({ disassembledIngredients, ratio, smallerBatchSize });
  }

  public render () {
    const { targetbatchsize, ingredients, dictionary } = this.props;
    const { disassembledIngredients, smallerBatchSize, ratio } = this.state;

    const finalBatchSize = (Helpers.getNumber(targetbatchsize) * ratio).toFixed(2) + Helpers.getUnits(targetbatchsize);

    return (<div className='calculator-wrapper modal'>
        <span>Target Batch: {targetbatchsize}</span>
        <input value={smallerBatchSize} onChange={(e) => this.onChange('smallerBatchSize', e)}/>
        <span>Ratio {this.state.ratio}</span>
        <br />
        <div className='calculator'>
          {disassembledIngredients.map((ele: IDisassembledIngredient, i) => {
            return (
              <div key={i}>
                <span>{ele.name}</span>
                <span>{ele.amount}</span>
                <input onChange={(e) => this.changeLimit(i, e)} value={ele.limit} />
                <span>{ele.total}</span>
              </div>
            );
          })}
          <span>Final size: {finalBatchSize}</span>
        </div>
        <button onClick={this.props.onClose}>Close Calculator</button>
      </div>);
  }

  private changeLimit = (i: number, e: React.FormEvent<HTMLInputElement>) => {
    const updatedEntry: IDisassembledIngredient[] = [...this.state.disassembledIngredients];

    // Find ratio of this ingredient and update if needed
    const newRatio = +(Helpers.getNumber(e.currentTarget.value) / Helpers.getNumber(updatedEntry[i].amount));

    updatedEntry[i].limit = e.currentTarget.value;
    if (newRatio !== 0) {
      updatedEntry[i].ratio = newRatio;
    }
    this.checkRatio(newRatio);
    this.setState({ disassembledIngredients: updatedEntry });
  }

  private checkRatio = (newRatio: number) => {
    if (newRatio < this.state.ratio && newRatio !== 0) {
      // Ratio is smaller, update
      this.updateRatio(newRatio);
      this.setState({ ratio: newRatio });
    } else if (newRatio >= this.state.ratio || newRatio === 0) {
      // Look for next smaller limitation
      const smallestRatio = (Helpers.getMin('ratio', this.state.disassembledIngredients) as IDisassembledIngredient).ratio;
      const ratio = smallestRatio || 1;
      this.updateRatio(ratio);
      this.setState({ ratio });
    }
  };

  private updateRatio = (newRatio: number) => {
    // Recalculate all the 'totals'
    const adjustedTotals = [...this.state.disassembledIngredients].map((ele: IDisassembledIngredient) => {
      const originalAmount = Helpers.getNumber(ele.amount);
      const unit = Helpers.getUnits(ele.amount);
      ele.total = (originalAmount * newRatio).toFixed(2) + unit;
      return ele;
    });
  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    // This is for limiting ingredients
    const input = e.currentTarget.value;
    const newRatio = +(Helpers.getNumber(input) / Helpers.getNumber(this.props.targetbatchsize)).toFixed(2);

    this.checkRatio(newRatio);
    this.setState({ [key as any]: input });
  }
}

export default RecipeCalculatorComponent as React.ComponentClass<IRecipeCalculatorComponentProps>;
