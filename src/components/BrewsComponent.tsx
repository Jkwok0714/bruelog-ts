import DataActions from 'actions/DataActions';
import { IAPIResponse, IDictionary } from 'constants/datatypes';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import BrewEntryComponent from './subcomponents/BrewEntryComponent';
import BrewListComponent from './subcomponents/BrewListComponent';

const VIEWS = {
  DETAIL: 0,
  LIST: 1
}

const BREW_PATH = 'api/brew';

interface IBrewsComponentProps {
  dictionary: IDictionary;
  recipes: any;
  applyRecipesData: (data: any) => void;
}

interface IBrewsComponentState {
  currentView: number;
  brews: any[];
}

class BrewsComponent extends React.Component<IBrewsComponentProps, IBrewsComponentState> {

  public state = {
    brews: [],
    currentView: VIEWS.LIST
  };

  private defaultEdit: any = null;
  private viewSelection: any = null;

  public componentWillMount () {
    this.getBrews();
  }

  public componentDidMount () {
    // check mprops.match.params.id for select brew
  }

  public render () {
    const { currentView } = this.state;
    const { dictionary } = this.props;

    return (
      <div>
        <h1>Brews</h1>
        {currentView === VIEWS.LIST && <BrewListComponent brews={this.state.brews} onAddBrewClick={this.onAddBrewClick} onEditBrew={this.onEditBrew} onViewBrew={this.onViewBrew} />}
        {currentView === VIEWS.DETAIL && <BrewEntryComponent dictionary={dictionary} onSubmit={this.onSubmit} onReturnToList={this.onReturnToList} viewBrew={this.viewSelection} editBrew={this.defaultEdit} />}

        {currentView === VIEWS.LIST && <button><Link to="">Back</Link></button>}
      </div>
    );
  }

  public onSubmit = (data: any, update: boolean) => {
    if (update) {
      APIService.put(BREW_PATH, data).then(res => {
        this.getBrews();
      });
    } else {
      APIService.post(BREW_PATH, data).then(res => {
        this.getBrews();
      });
    }
  }

  public onEditBrew = (recipe) => {
    this.viewSelection = null;
    this.defaultEdit = recipe;
    this.setState({ currentView: VIEWS.DETAIL });
  };

  public onViewBrew = (recipe) => {
    this.defaultEdit = null;
    this.viewSelection = recipe;
    this.setState({ currentView: VIEWS.DETAIL });
  };


  private getBrews = () => {
    APIService.get(BREW_PATH).then((res: IAPIResponse) => {
      this.setState({ brews: res.data});
    }).catch(err => window.console.error(err));
  }

  private onAddBrewClick = () => {
    this.defaultEdit = {};
    this.setState({ currentView: VIEWS.DETAIL });
  };

  private onReturnToList = (update = false) => {
    if (update) {
      this.getBrews();
    }
    this.setState({ currentView: VIEWS.LIST });
  }

}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    recipes: state.recipes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyRecipesData: (dictionary) => dispatch(DataActions.applyRecipesData(dictionary))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrewsComponent as React.ComponentClass<IBrewsComponentProps>));
