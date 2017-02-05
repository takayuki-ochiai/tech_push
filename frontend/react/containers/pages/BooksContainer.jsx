import React from 'react';
import MicroContainer from 'react-micro-container';
import CircularProgress from 'material-ui/CircularProgress';
import Books from '../../components/pages/Books';
import BooksStore from '../../stores/Books';

export default class BooksContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: new BooksStore()
    };
  }

  async setInitialData() {
    const newStore = await BooksStore.newInstance();
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
    return <Books dispatch={this.dispatch} {...this.state} />;
  }
}
