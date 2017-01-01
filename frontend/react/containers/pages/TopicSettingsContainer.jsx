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

  get store() {
    return this.state.store;
  }

  get topics() {
    return this.store.topics;
  }

  async fetchTopicSettings() {
    const interestResponse = await apiResource.get('/api/v1/user/interests');
    const topicResponse = await apiResource.get('/api/v1/topics');
    // TODO 500エラーハンドリング
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
      store: this.store.set('topics', topics)
    });
  }

  goChildTopics(topicId) {
    this.props.router.push({
      pathname: `/topics/edit/${topicId}`,
      query: { transition: 'slideRight' }
    });
  }

  /**
   * 対象のトピックの先祖のトピックをすべて取得します
   */
  findAncestorTopics(targetTopic) {
    let resultTopics = [];
    const topics = this.topics.toArray();
    const parentTopic = topics.find(topic => topic.id === targetTopic.parentId);
    if (parentTopic) {
      resultTopics.push(parentTopic);
      const ancestorTopics = this.findAncestorTopics(parentTopic);
      resultTopics = resultTopics.concat(ancestorTopics);
    }
    return resultTopics;
  }

  /**
   * 自分の子孫トピックをすべて取得する
   */
  findDescendantTopics(ancestorTopic) {
    const topics = this.topics.toArray();
    const childTopics = topics.filter(topic => ancestorTopic.id === topic.parentId);
    const descendantTopics = childTopics.reduce((resultList, childTopic) => {
      const recursiveTopics = this.findDescendantTopics(childTopic);
      const newResultList = resultList.concat(recursiveTopics);
      return newResultList;
    }, []);
    return childTopics.concat(descendantTopics);
  }

  /**
   * 対象のトピックの親とその先祖について、
   * フォロー対象に含めるべき先祖のトピックを取得します。
   */
  findFollowAncestorTopics(targetTopic) {
    // もし自分の兄弟要素がすべてフォロー中だったら、自分の親要素をフォロー対象に追加
    let resultTopics = [];
    // さらに祖先の要素も再帰的にフォロー対象に追加
    const topics = this.topics.toArray();
    const siblingsTopic = topics.filter(
      topic => (topic.parentId === targetTopic.parentId && topic.id !== targetTopic.id)
    );
    const isFollowParent = siblingsTopic.every(sibling => sibling.isFollow);
    if (isFollowParent) {
      const parentTopic = topics.find(topic => topic.id === targetTopic.parentId);
      if (parentTopic) {
        resultTopics.push(parentTopic);
        const ancestorTopics = this.findFollowAncestorTopics(parentTopic);
        resultTopics = resultTopics.concat(ancestorTopics);
      }
    }
    return resultTopics;
  }

  /**
   * 画面のフォロー情報を更新して、
   * APIにトピックのフォロー情報の更新を連携する。
   * フォロー連携に失敗した場合は画面のフォロー情報をロールバックする
   */
  async followTopic(topic) {
    // フォロー状態にする自分の子孫を探す
    const descendantTopics = this.findDescendantTopics(topic);
    // フォロー状態にする先祖の要素を追加
    const followingAncestorTopics = this.findFollowAncestorTopics(topic);
    let followTopics = descendantTopics.concat(followingAncestorTopics);
    // フォロー対象に自分を追加
    followTopics = followTopics.concat(topic);

    // フォロー状態に更新
    let updateTopics = this.topics;
    followTopics.forEach(followTopic => {
      const index = updateTopics.findIndex(
        candidateTopic => candidateTopic.id === followTopic.id
      );
      updateTopics = updateTopics.update(index, updateTopic => updateTopic.set('isFollow', true));
    });

    // 画面ロールバック用のトピック情報を取得しておく
    const rollBackTopics = this.topics;

    this.setState({
      store: this.store.set('topics', updateTopics)
    });

    const followTopicsParam = followTopics.map(followTopic => followTopic.toObject());
    const updateResponse = await apiResource.post('/api/v1/user/interests/follow', { topics: followTopicsParam });
    // エラー時はロールバックする
    if (updateResponse.error) {
      this.setState({
        store: this.store.set('topics', rollBackTopics)
      });
    }
  }

  async unfollowTopic(topic) {
    // フォロー解除にする自分の子孫を探す
    const descendantTopics = this.findDescendantTopics(topic);
    // フォロー解除にする先祖の要素を追加
    const ancestorTopics = this.findAncestorTopics(topic);
    let unfollowTopics = descendantTopics.concat(ancestorTopics);
    // フォロー解除対象に自分を追加
    unfollowTopics = unfollowTopics.concat(topic);

    // フォロー解除状態に更新
    let updateTopics = this.topics;
    unfollowTopics.forEach(unfollowTopic => {
      const index = updateTopics.findIndex(
        candidateTopic => candidateTopic.id === unfollowTopic.id
      );
      updateTopics = updateTopics.update(index, updateTopic => updateTopic.set('isFollow', false));
    });

    this.setState({
      store: this.store.set('topics', updateTopics)
    });

    // 画面ロールバック用のトピック情報を取得しておく
    const rollBackTopics = this.topics;
    const unfollowTopicParam = unfollowTopics.map(unfollowTopic => unfollowTopic.toObject());
    const updateResponse = await apiResource.post('/api/v1/user/interests/unfollow', { topics: unfollowTopicParam });
    // エラー時はロールバックする
    if (updateResponse.error) {
      this.setState({
        store: this.store.set('topics', rollBackTopics)
      });
    }
  }

  componentDidMount() {
    this.setInitialData();
    this.subscribe({
      goChildTopics: this.goChildTopics,
      followTopic: this.followTopic,
      unfollowTopic: this.unfollowTopic
    });
  }

  render() {
    const parentId = parseInt(this.props.params.parentId, 10);
    return (
      <TopicSettings
        dispatch={this.dispatch}
        store={this.store}
        parentId={parentId}
      />
    );
  }
}

export default withRouter(TopicSettingsContainer);
