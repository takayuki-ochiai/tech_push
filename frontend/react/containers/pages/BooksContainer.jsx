import React from 'react';
import MicroContainer from 'react-micro-container';
import { List } from 'immutable';
import CircularProgress from 'material-ui/CircularProgress';
import Books from '../../components/pages/Books';
import BooksStore from '../../stores/Books';
import Book from '../../stores/entities/Book';
import { apiResource } from '../../main';

export default class BooksContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: new BooksStore()
    };
  }

  async fetchBooks() {
    const booksResponse = await apiResource.get('/api/v1/books');
    const books = new List(booksResponse.books.map(book => new Book(book)));
    // TODO 500エラーハンドリング
    return {
      books
    };
  }

  async setInitialData() {
    const initialData = await this.fetchBooks();
    const newStore = this.state.store.withMutations(state => (
      state.set('books', initialData.books)
        .set('isLoading', false)
    ));
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
