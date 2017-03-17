import { Record } from 'immutable';

const NoticeBase = new Record({
  id: null,
  book_id: null,
  user_id: null,
  contents: null,
  linkUrl: null,
  notifyDate: null,
  // book_idにひもづくbook取得
  book: null
});

export default class Notice extends NoticeBase {
}
