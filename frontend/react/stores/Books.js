import { Record, List } from 'immutable';

const BooksBase = new Record({
  books: new List()
});

export default class Books extends BooksBase {

}
