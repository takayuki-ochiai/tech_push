import React from 'react';
import MicroContainer from 'react-micro-container';
import { List } from 'immutable';
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
    const newStore = new BooksStore(initialData);
    this.setState({
      store: newStore
    });
  }

  componentDidMount() {
    this.setInitialData();
  }

  render() {
    return <Books dispatch={this.dispatch} {...this.state} />;
  }
}
