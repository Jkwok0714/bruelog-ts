import LoginActions from 'actions/LoginActions';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const UPLOAD_PATH = 'upload';

class ManagementComponent extends React.Component<any, any> {
  public file = null;

  public render () {

    return <div>
      Management Component
      <form onSubmit={this.onSubmit}>
        <input onChange={this.handleFileSelect} type='file' name='uploadFile' />
        <input type='submit' />
      </form>
      <button><Link to="">Back</Link></button>
    </div>;
  }


  private handleFileSelect = (e) => {
    this.file = e.target.files[0];
  }

  private onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    if (this.file === null) {
      return;
    }

    window.console.log(this.file);

    data.append('uploadFile', this.file as any);
    data.append('username', this.props.user.username);
    data.append('purpose', 'userImage');

    APIService.post(UPLOAD_PATH, data).then((res: any) => {
      // stuff
      window.console.log(res.data);
      this.props.changeUserProperty({
        image: res.data
      });
    }).catch(err => {
      // other stuff
    });
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUserProperty: (property) => dispatch(LoginActions.changeUserProperty(property))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagementComponent as React.ComponentClass<any>));
