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

  public componentWillMount () {
    const { dictionary, ingredients } = this.props;
    const disassembledIngredients = Object.keys(ingredients).map(ingredientKey => {
      const split = ingredientKey.split('_');

      return {
        amount: ingredients[ingredientKey],
        limit: '',
        name: dictionary[split[0]][split[1]].name,
        total: ''
      };
    });

    this.setState({ disassembledIngredients });
  }

  public render () {
    const { targetbatchsize, ingredients, dictionary } = this.props;
    const { disassembledIngredients, smallerBatchSize } = this.state;

    return (<div className='calculator-wrapper modal'>
        <span>Target Batch: {targetbatchsize}</span>
        <input value={smallerBatchSize} onChange={(e) => this.onChange('smallerBatchSize', e)}/>
        <span>Ratio {this.state.ratio}</span>
        <br />
        <div className='calculator'>
          {disassembledIngredients.map((ele, i) => {
            return (
              <div key={i}>
                <span>{(ele as IDisassembledIngredient).name}</span>
                <span>{(ele as IDisassembledIngredient).amount}</span>
                <input onChange={(e) => this.changeLimit(i, e)} value={(ele as IDisassembledIngredient).limit} />
                <span>{(ele as IDisassembledIngredient).total}</span>
              </div>
            );
          })}
        </div>
        <button onClick={this.props.onClose}>Close Calculator</button>
      </div>);
  }

  private changeLimit = (i: number, e: React.FormEvent<HTMLInputElement>) => {
    const updatedEntry = [...this.state.disassembledIngredients];
    (updatedEntry[i] as IDisassembledIngredient).limit = e.currentTarget.value;
    this.setState({ disassembledIngredients: updatedEntry });
  }

  private updateRatio = (newRatio: number) => {
    // Recalculate all the 'totals'
    const adjustedTotals = [...this.state.disassembledIngredients].map(ele => {
      const originalAmount = Helpers.getNumber((ele as IDisassembledIngredient).amount);
      const unit = Helpers.getUnits((ele as IDisassembledIngredient).amount);
      (ele as IDisassembledIngredient).total = (originalAmount * newRatio).toFixed(2) + unit;
      return ele;
    });

  }

  private onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const newRatio = +(Helpers.getNumber(input) / Helpers.getNumber(this.props.targetbatchsize)).toFixed(2);
    this.updateRatio(newRatio);
    this.setState({ [key as any]: input, ratio: newRatio });
  }
}

export default RecipeCalculatorComponent as React.ComponentClass<IRecipeCalculatorComponentProps>;
