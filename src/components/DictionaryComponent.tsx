import DataActions from 'actions/DataActions';
import { BASE_URL } from 'constants/';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

// import HopDictionary from './subcomponents/HopDictionary';
// import MaltDictionary from './subcomponents/MaltDictionary';
// import YeastDictionary from './subcomponents/YeastDictionary';
import DictionaryEntryComponent from './subcomponents/DictionaryEntryComponent';
const DICTIONARY_PATH = 'dictionary';

const VIEWS = {
  HOPS: 1,
  MALTS: 2,
  YEAST: 3
}

interface IDictionaryComponentProps {
  message: string;
  user: any;
  dictionary: object;

  applyDictionaryData: (data) => void;
}

interface IDictionaryComponentState {
  display: number;

  showingAddEntry: boolean;
}

class DictionaryComponent extends React.Component<IDictionaryComponentProps, IDictionaryComponentState> {
  public state = {
    display: VIEWS.HOPS,
    showingAddEntry: false
  };

  public componentWillMount () {
    APIService.get(DICTIONARY_PATH).then((data: any) => {
      // window.console.log(data.data);
      this.props.applyDictionaryData(data.data);
    }).catch(err => {
      // handle error
    });
  }

  public render () {
    const { message, user } = this.props;

    const username = user ? user.username : '';

    return (<div className='dictionary-wrapper'>
      <button onClick={() => this.changeView(VIEWS.HOPS)}>Hops</button>
      <button onClick={() => this.changeView(VIEWS.MALTS)}>Malts</button>
      <button onClick={() => this.changeView(VIEWS.YEAST)}>Yeast</button>

      { this.getDictionaryBlock() }
      <button><Link to="">Back</Link></button>
    </div>);
  }

  private changeView (display: number) {
    this.setState({ display });
  }

  private addNewEntry = () => {
    // Hi
  }

  private updateEntry = () => {
    // Hi 2
  }

  private getDictionaryBlock () {
    const { display } = this.state;

    let dictionaryData = '';

    if (display === VIEWS.HOPS) {
      dictionaryData = 'hops';
    } else if (display === VIEWS.MALTS) {
      dictionaryData = 'malts';
    } else if (display === VIEWS.YEAST) {
      dictionaryData = 'yeast';
    }

    const data = this.props.dictionary[dictionaryData];

    return (
      <div className='dictionary-list'>
        {data.map(entry => {
            return <DictionaryEntryComponent key={entry} item={entry} />
          })
        }
        <div>
          <button onClick={this.addNewEntry}>Add a new entry</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    message: state.message,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyDictionaryData: (dictionary) => dispatch(DataActions.applyDictionaryData(dictionary))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DictionaryComponent as React.ComponentClass<any>));
