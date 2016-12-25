import { Record } from 'immutable';

const TopicBase = new Record({
  id: null,
  name: null,
  type: null,
  parentId: null,
  isFollow: false
});

export default class Topic extends TopicBase {

}
