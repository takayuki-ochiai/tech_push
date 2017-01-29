import React from 'react';
import MicroContainer from 'react-micro-container';
import { List } from 'immutable';
import { withRouter } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import TopicSettings from '../../components/pages/TopicSettings';
import TopicSettingStore from '../../stores/TopicSettings';

import { apiResource } from '../../main';
import Topic from '../../stores/entities/Topic';
import TopicTreePath from '../../stores/entities/TopicTreePath';
import TopicFilter from '../../models/TopicFilter';

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

  get topicTreePathes() {
    return this.store.topicTreePathes;
  }

  async fetchTopicSettings() {
    const interestResponse = await apiResource.get('/api/v1/user/interests');
    const topicResponse = await apiResource.get('/api/v1/topics');
    // TODO 500エラーハンドリング
    return {
      interests: interestResponse.interests,
      topics: topicResponse.topics,
      topicTreePathes: topicResponse.topicTreePathes
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
    let topicTreePathes = initialData.topicTreePathes
      .map(treePath => new TopicTreePath(treePath));
    topicTreePathes = new List(topicTreePathes);

    const newStore = this.store.withMutations(state => (
      state.set('topics', topics)
        .set('topicTreePathes', topicTreePathes)
        .set('isLoading', false)
    ));
    this.setState({
      store: newStore
    });
  }

  goChildTopics(topicId) {
    this.props.router.push({
      pathname: `/topics/edit/${topicId}`,
      query: { transition: 'slideRight' }
    });
  }

  /**
   * 画面のフォロー情報を更新して、
   * APIにトピックのフォロー情報の更新を連携する。
   * フォロー連携に失敗した場合は画面のフォロー情報をロールバックする
   */
  async followTopic(topic) {
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

  /**
   * 画面のフォロー情報を更新して、
   * APIにトピックのアンフォロー情報の更新を連携する。
   * アンフォロー連携に失敗した場合は画面のフォロー情報をロールバックする
   */
  async unfollowTopic(topic) {
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
    if (this.state.store.isLoading) {
      return (
        <div
          style={{
            marginTop: 24,
            textAlign: 'center'
          }}
        >
          <CircularProgress />
        </div>
      );
    }
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
