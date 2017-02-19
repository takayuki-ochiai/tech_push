import { Record, List } from 'immutable';
import Notice from '../stores/entities/Notice';

const NoticesBase = new Record({
  notices: new List(),
  isLoading: true
});

export default class Notices extends NoticesBase {
  static async fetchNotices(apiResource) {
    const body = await apiResource.get('/api/v1/user/notices');
    const notices = new List(body.notices.map(notice => new Notice(notice)));
    // TODO 500エラーハンドリング
    return notices;
  }

  static async newInstance(apiResource) {
    const notices = await this.fetchNotices(apiResource);
    const newStore = new this({
      notices,
      isLoading: false
    });
    return newStore;
  }
}
