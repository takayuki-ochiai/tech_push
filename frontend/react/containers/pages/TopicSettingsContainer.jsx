import React from 'react';
import MicroContainer from 'react-micro-container';
import { withRouter } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import TopicSettings from '../../components/pages/TopicSettings';
import TopicSettingStore from '../../stores/TopicSettings';

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

  get apiResource() {
    return this.props.apiResource;
  }

  async setInitialData() {
    const newStore = await TopicSettingStore.newInstance(this.props.apiResource);
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
    const beforeFollow = this.store;
    const { afterFollowStore, followTopics } = beforeFollow.followTopic(topic);
    this.setState({
      store: afterFollowStore
    });

    const followTopicsParam = followTopics.map(followTopic => followTopic.toObject());
    const updateResponse = await this.apiResource.post('/api/v1/user/interests/follow', { topics: followTopicsParam });
    // エラー時はロールバックする
    if (updateResponse.error) {
      this.setState({
        store: beforeFollow
      });
    }
  }

  /**
   * 画面のフォロー情報を更新して、
   * APIにトピックのアンフォロー情報の更新を連携する。
   * アンフォロー連携に失敗した場合は画面のフォロー情報をロールバックする
   */
  async unfollowTopic(topic) {
    const beforeUnfollow = this.store;
    const { afterUnfollowStore, unfollowTopics } = beforeUnfollow.unfollowTopic(topic);

    this.setState({
      store: afterUnfollowStore
    });

    // 画面ロールバック用のトピック情報を取得しておく
    const unfollowTopicParam = unfollowTopics.map(unfollowTopic => unfollowTopic.toObject());
    const updateResponse = await this.apiResource.post('/api/v1/user/interests/unfollow', { topics: unfollowTopicParam });
    // エラー時はロールバックする
    if (updateResponse.error) {
      this.setState({
        store: beforeUnfollow
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
