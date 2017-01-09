import { Record } from 'immutable';

const TopicTreePathBase = new Record({
  ancestorId: null,
  descendantId: null,
  parentalFlg: false
});

export default class TopicTreePath extends TopicTreePathBase {
  /**
   * 直接の親子関係かどうかを表す
   */
  isParental() {
    return this.parentalFlg;
  }
}
