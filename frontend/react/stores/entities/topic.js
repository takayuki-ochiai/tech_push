import { Record } from 'immutable';

const TopicBase = new Record({
  id: null,
  name: null,
  type: null,
  isFollow: false
});

const FIRST_TOPIC = 'FirstTopic';

export default class Topic extends TopicBase {
  isFirstTopic() {
    return this.type === FIRST_TOPIC;
  }
}
