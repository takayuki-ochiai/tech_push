import React from 'react';
import MicroContainer from 'react-micro-container';
import { List } from 'immutable';
import { withRouter } from 'react-router';

import TopicSettings from '../../components/pages/TopicSettings';
import TopicSettingStore from '../../stores/topicSettings';

import { apiResource } from '../../main';
import Topic from '../../stores/entities/topic';

/**
 * コンテナクラス
 * データ取得・storeへのセットなどを行う
 */
class TopicSettingsContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: new TopicSettingStore()
    };
  }

  async fetchTopicSettings() {
    const interestResponse = await apiResource.get('/api/v1/user/interests');
    const topicResponse = await apiResource.get('/api/v1/topics');
    return {
      interests: interestResponse.interests,
      topics: topicResponse.topics
    };
  }

  async setInitialData() {
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
    this.setState({
      store: this.state.store.set('topics', topics)
    });
  }

  goChildTopics(topicId) {
    this.props.router.push(`/topics/edit/${topicId}`);
  }

  /**
   * 自分の子孫トピックをすべて取得する
   */
  findDescendantTopics(ancestorTopic) {
    const topics = this.state.store.topics.toArray();
    const childTopics = topics.filter(topic => {
      if (ancestorTopic.id === topic.parentId) {
        console.log(true);
      }
      return ancestorTopic.id === topic.parentId;
    });
    const descendantTopics = childTopics.reduce((resultList, childTopic) => {
      const recursiveTopics = this.findDescendantTopics(childTopic);
      const newResultList = resultList.concat(recursiveTopics);
      return newResultList;
    }, []);
    return childTopics.concat(descendantTopics);
  }

  /**
   * 画面のフォロー情報を更新して、
   * APIにトピックのフォロー情報の更新を連携する。
   * フォロー連携に失敗した場合は画面のフォロー情報をロールバックする
   */
  followTopic(topic) {
    // フォロー状態にする自分の子孫を探す
    const descendantTopics = this.findDescendantTopics(topic);
    // descendantTopics = descendantTopics.map(topics => topics.set('isFollow', true));
    const followTopics = descendantTopics.concat(topic);
    let updateTopics = this.state.store.topics;
    followTopics.forEach(followTopic => {
      const index = updateTopics.findIndex(
        candidateTopic => candidateTopic.id === followTopic.id
      );
      updateTopics = updateTopics.update(index, updateTopic => updateTopic.set('isFollow', true));
    });

    this.setState({
      store: this.state.store.set('topics', updateTopics)
    });
    // フォロー状態にする自分の祖先を探す
  }

  componentDidMount() {
    this.setInitialData();
    this.subscribe({
      goChildTopics: this.goChildTopics,
      followTopic: this.followTopic
    });
  }

  render() {
    const parentId = parseInt(this.props.params.parentId, 10);
    return (
      <TopicSettings
        dispatch={this.dispatch}
        store={this.state.store}
        parentId={parentId}
      />
    );
  }
}

export default withRouter(TopicSettingsContainer);
