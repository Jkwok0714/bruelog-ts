import { BASE_URL } from 'constants/';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import HopDictionary from './subcomponents/HopDictionary';
import MaltDictionary from './subcomponents/MaltDictionary';
import YeastDictionary from './subcomponents/YeastDictionary';

const VIEWS = {
  HOPS: 1,
  MALTS: 2,
  YEAST: 3
}

interface IDictionaryComponentProps {
  message: string;
  user: any;
}

interface IDictionaryComponentState {
  display: number;
}

class DictionaryComponent extends React.Component<IDictionaryComponentProps, IDictionaryComponentState> {
  public state = {
    display: VIEWS.HOPS
  };

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

  private getDictionaryBlock () {
    const { display } = this.state;

    if (display === VIEWS.HOPS) {
      return <HopDictionary />;
    } else if (display === VIEWS.MALTS) {
      return <MaltDictionary />;
    } else if (display === VIEWS.YEAST) {
      return <YeastDictionary />;
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(DictionaryComponent as React.ComponentClass<any>));
