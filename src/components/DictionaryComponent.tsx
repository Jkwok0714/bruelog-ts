import DataActions from 'actions/DataActions';
import { BASE_URL } from 'constants/';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import DictionaryEntryComponent from './subcomponents/DictionaryEntryComponent';
const DICTIONARY_PATH = 'dictionary';

const VIEWS = {
  HOPS: 1,
  MALTS: 2,
  YEAST: 3
}

interface IDictionaryCategory {
  malts?: object[];
  hops?: object[];
  yeast?: object[];
}

interface IDictionaryEntry {
  description: string;
  flavors: string;
  id?: number;
  name: string;
  type?: string;
}

interface IDictionary {
  hops: IDictionaryEntry[];
  malts: IDictionaryEntry[];
  yeast: IDictionaryEntry[];
}

interface IDictionaryComponentProps {
  message: string;
  user: any;
  dictionary: object;

  applyDictionaryData: (data) => void;
  updateDictionary: (data: IDictionaryCategory) => void;
}

interface IDictionaryComponentState {
  display: number;

  showingAddEntry: boolean;
  showingDictionary: IDictionaryEntry[];
}

class DictionaryComponent extends React.Component<IDictionaryComponentProps, IDictionaryComponentState> {
  public state = {
    display: VIEWS.HOPS,
    showingAddEntry: false,
    showingDictionary: []
  };

  public componentWillMount () {
    APIService.get(DICTIONARY_PATH).then((data: any) => {
      // window.console.log(data.data);
      this.props.applyDictionaryData(data.data);
      this.setState({ showingDictionary: data.data[this.getTypeString(VIEWS.HOPS)] })
    }).catch(err => {
      // handle error
    });
  }

  public componentWillReceiveProps (newProps) {
    // window.console.log('New Props', newProps);
  }

  public render () {
    const { message, user } = this.props;
    const { display, showingAddEntry, showingDictionary } = this.state;
    const type = this.getTypeString(display);
    const username = user ? user.username : '';

    return (<div className='dictionary-wrapper'>
      <button onClick={() => this.changeView(VIEWS.HOPS)}>Hops</button>
      <button onClick={() => this.changeView(VIEWS.MALTS)}>Malts</button>
      <button onClick={() => this.changeView(VIEWS.YEAST)}>Yeast</button>

      <div className='dictionary-list'>
        {showingDictionary.map((entry: IDictionaryEntry) => {
            return <DictionaryEntryComponent key={entry.id} item={entry} onSubmit={this.updateEntry} type={type}/>
          })
        }
        <div>
          <button onClick={this.toggleShowNewEntry}>{showingAddEntry ? 'Cancel' : 'Add Entry'}</button>
          {showingAddEntry && <DictionaryEntryComponent editing={true} onSubmit={this.addNewEntry} type={type}/>}
        </div>
      </div>
      <button><Link to="">Back</Link></button>
    </div>);
  }

  private changeView (display: number) {
    const dictionaryData = this.getTypeString(display);

    const data = this.props.dictionary[dictionaryData];

    window.console.log(data);

    // For some reason the items weren't updating correctly. Ensure list is re-rendered
    this.setState({ display, showingDictionary: [] }, () => {
      this.setState({ showingDictionary: data });
    });
  }

  private getTypeString (display: number) {
    if (display === VIEWS.HOPS) {
      return 'hops';
    } else if (display === VIEWS.MALTS) {
      return 'malts';
    } else if (display === VIEWS.YEAST) {
      return 'yeast';
    }
    return '';
  }

  private constructNewData (data: IDictionaryEntry, update: boolean) {
    const { dictionary } = this.props;
    const editType = data.type as string;
    const newDictionary = dictionary[editType].slice(0);
    delete data.type;

    if (update) {
      // This is an update
      const index = newDictionary.map(o => o.id).indexOf(data.id);
      newDictionary[index] = data;
    } else {
      newDictionary.push(data);
    }

    return { [editType]: newDictionary};
  }

  private addNewEntry = (data: IDictionaryEntry) => {
    APIService.post(DICTIONARY_PATH, data).then(res => {
      data.id = (res as any).data.id;
      this.props.updateDictionary(this.constructNewData(data, false));
      this.setState({ showingAddEntry: false });
    }).catch(err => {
      window.console.error('Error posting new entry', err.message);
    });
  }

  private updateEntry = (data: IDictionaryEntry) => {
    APIService.put(DICTIONARY_PATH, data).then(res => {
      this.props.updateDictionary(this.constructNewData(data, true));
    }).catch(err => {
      window.console.error('Error putting new entry', err.message);
    });
  }

  private toggleShowNewEntry = () => {
    this.setState({ showingAddEntry: !this.state.showingAddEntry });
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
    applyDictionaryData: (dictionary) => dispatch(DataActions.applyDictionaryData(dictionary)),
    updateDictionary: (dictionary) => dispatch(DataActions.updateDictionary(dictionary))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DictionaryComponent as React.ComponentClass<any>));
