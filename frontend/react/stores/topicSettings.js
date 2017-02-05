import { Record, List } from 'immutable';
import { apiResource } from '../main';
import Topic from '../stores/entities/Topic';
import TopicTreePath from '../stores/entities/TopicTreePath';
import TopicFilter from '../models/TopicFilter';

const TopicSettingsBase = new Record({
  topics: new List(),
  topicTreePathes: new List(),
  isLoading: true
});

export default class TopicSettings extends TopicSettingsBase {
  static async newInstance() {
    const initialData = await this.fetchTopicSettings();
    let topics = initialData.topics
      .map(topic => new Topic(topic))
      .map(topic => {
        if (initialData.interests.some(interest => topic.id === interest.topicId)) {
          return topic.set('isFollow', true);
        }
        return topic;
      });
    topics = new List(topics);
    let topicTreePathes = initialData.topicTreePathes
      .map(treePath => new TopicTreePath(treePath));
    topicTreePathes = new List(topicTreePathes);

    const newStore = new this({
      topics,
      topicTreePathes,
      isLoading: false
    });

    return newStore;
  }

  static async fetchTopicSettings() {
    const interestResponse = await apiResource.get('/api/v1/user/interests');
    const topicResponse = await apiResource.get('/api/v1/topics');
    // TODO 500エラーハンドリング
    return {
      interests: interestResponse.interests,
      topics: topicResponse.topics,
      topicTreePathes: topicResponse.topicTreePathes
    };
  }

  followTopic(topic) {
    // // フォロー状態にする自分の子孫を探す
    const filter = new TopicFilter(this.topics, this.topicTreePathes);
    const followTopics = filter.filterFollowTopics(topic);

    // フォロー状態に更新
    let updateTopics = this.topics;
    followTopics.forEach(followTopic => {
      const index = updateTopics.findIndex(
        candidateTopic => candidateTopic.id === followTopic.id
      );
      updateTopics = updateTopics.update(index, updateTopic => updateTopic.set('isFollow', true));
    });

    return {
      afterFollowStore: this.set('topics', updateTopics),
      followTopics
    };
  }

  unfollowTopic(topic) {
    const filter = new TopicFilter(this.topics, this.topicTreePathes);
    const unfollowTopics = filter.filterUnfollowTopics(topic);

    // フォロー解除状態に更新
    let updateTopics = this.topics;
    unfollowTopics.forEach(unfollowTopic => {
      const index = updateTopics.findIndex(
        candidateTopic => candidateTopic.id === unfollowTopic.id
      );
      updateTopics = updateTopics.update(index, updateTopic => updateTopic.set('isFollow', false));
    });

    return {
      afterUnfollowStore: this.set('topics', updateTopics),
      unfollowTopics
    };
  }
}
