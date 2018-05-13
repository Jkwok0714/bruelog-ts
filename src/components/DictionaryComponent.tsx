import DataActions from 'actions/DataActions';
import { BASE_URL } from 'constants/';
import { IDictionary, IDictionaryCategory, IDictionaryEntry } from 'constants/datatypes';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import DictionaryEntryComponent from './subcomponents/DictionaryEntryComponent';
const DICTIONARY_PATH = 'dictionary';

const VIEWS = {
  HOPS: 1,
  MALTS: 2,
  OTHER: 4,
  YEAST: 3
}

interface IDictionaryComponentProps {
  message: string;
  user: any;
  dictionary: IDictionary;

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

  public render () {
    const { message, user, dictionary } = this.props;
    const { display, showingAddEntry } = this.state;
    const type = this.getTypeString(display);
    const username = user ? user.username : '';

    const dictionaryDisplay = dictionary[this.getTypeString(display)];

    return (<div className='dictionary-wrapper'>
      <button onClick={() => this.changeView(VIEWS.HOPS)}>Hops</button>
      <button onClick={() => this.changeView(VIEWS.MALTS)}>Malts</button>
      <button onClick={() => this.changeView(VIEWS.YEAST)}>Yeast</button>
      <button onClick={() => this.changeView(VIEWS.OTHER)}>Other</button>

      <div className='dictionary-list'>
        {dictionaryDisplay.map((entry: IDictionaryEntry) => {
            return <DictionaryEntryComponent key={entry.id+entry.name} item={entry} onSubmit={this.updateEntry} onDelete={this.deleteEntry} type={type}/>
          })
        }
        <div>
          <button onClick={this.toggleShowNewEntry}>{showingAddEntry ? 'Cancel' : 'Add Entry'}</button>
          {showingAddEntry && <DictionaryEntryComponent editing={true} onSubmit={this.addNewEntry} type={type}/>}
        </div>
      </div>
      <button><Link to="">Back</Link></button>
      { dictionary.update }
    </div>);
  }

  private changeView (display: number) {
    this.setState({display});
  }

  private getTypeString (display: number) {
    if (display === VIEWS.HOPS) {
      return 'hops';
    } else if (display === VIEWS.MALTS) {
      return 'malts';
    } else if (display === VIEWS.YEAST) {
      return 'yeast';
    }
    return 'other';
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
      // this.setState({ showingDictionary: newDictionary });
    }

    return { [editType]: newDictionary };
  }

  private addNewEntry = (data: IDictionaryEntry) => {
    APIService.post(DICTIONARY_PATH, data).then(res => {
      data.id = (res as any).data.id;
      const newData = this.constructNewData(data, false);
      this.props.updateDictionary(newData);
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

  private deleteEntry = (type: string, id: number) => {
    APIService.delete(DICTIONARY_PATH, {id, type}).then(res => {
      const newDict = this.props.dictionary[type].filter(ele => ele.id !== id);
      this.props.updateDictionary({[type]: newDict});
      // this.setState({ showingDictionary: newDict });
    }).catch(err => {
      window.console.error('Error deleting new entry', err.message);
    });
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
