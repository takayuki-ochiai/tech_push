import { Record, List } from 'immutable';

const BooksBase = new Record({
  books: new List(),
  isLoading: true
});

export default class Books extends BooksBase {

}
