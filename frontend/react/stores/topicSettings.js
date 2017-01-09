import { Record, List } from 'immutable';

const TopicSettingsBase = new Record({
  topics: new List(),
  topicTreePathes: new List()
});

export default class TopicSettings extends TopicSettingsBase {

}
