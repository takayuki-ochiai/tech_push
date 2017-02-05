import React from 'react';
import MicroContainer from 'react-micro-container';
import CircularProgress from 'material-ui/CircularProgress';
import Notices from '../../components/pages/Notices';
import NoticesStore from '../../stores/Notices';

export default class BooksContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: new NoticesStore()
    };
  }

  async setInitialData() {
    const newStore = await NoticesStore.newInstance();
    this.setState({
      store: newStore
    });
  }

  componentDidMount() {
    this.setInitialData();
  }

  render() {
    if (this.state.store.isLoading) {
      return (
        <div
          style={{
            marginTop: 24,
            textAlign: 'center'
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    return <Notices dispatch={this.dispatch} {...this.state} />;
  }
}
