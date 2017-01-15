import { Record } from 'immutable';

const BookBase = new Record({
  id: null,
  title: null,
  publisherName: null,
  author: null,
  isbn: null,
  price: null,
  displayFlg: false,
  salesDate: null,
  smallImageUrl: null,
  mediumImageUrl: null,
  largeImageUrl: null
});

export default class Book extends BookBase {
}
