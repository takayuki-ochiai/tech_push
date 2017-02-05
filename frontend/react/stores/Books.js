import { Record, List } from 'immutable';
import { apiResource } from '../main';
import Book from '../stores/entities/Book';

const BooksBase = new Record({
  books: new List(),
  isLoading: true
});

export default class Books extends BooksBase {
  static async fetchBooks() {
    const booksResponse = await apiResource.get('/api/v1/books');
    const books = new List(booksResponse.books.map(book => new Book(book)));
    // TODO 500エラーハンドリング
    return books;
  }

  static async newInstance() {
    const books = await this.fetchBooks();
    const newStore = new this({
      books,
      isLoading: false
    });
    return newStore;
  }
}
