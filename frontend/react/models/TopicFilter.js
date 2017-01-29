export default class TopicFilter {
  constructor(topics, topicTreePathes) {
    this.topics = topics;
    this.topicTreePathes = topicTreePathes;
  }

  /**
   * 対象のトピックの先祖のトピックをすべて取得します
   */
  filterAncestorTopics(targetTopic) {
    const topics = this.topics.toArray();
    const ancestorTopicIds = this.topicTreePathes.toArray()
      .filter(treePath => treePath.descendantId !== treePath.ancestorId)
      .filter(treePath => treePath.descendantId === targetTopic.id)
      .map(treePath => treePath.ancestorId);

    const ancestorTopics = topics.filter(topic => ancestorTopicIds.includes(topic.id));
    return ancestorTopics;
  }

  /**
   * 自分の子孫トピックをすべて取得する
   */
  filterDescendantTopics(targetTopic) {
    const topics = this.topics.toArray();
    const descendantTopicIds = this.topicTreePathes.toArray()
      .filter(treePath => treePath.descendantId !== treePath.ancestorId)
      .filter(treePath => treePath.ancestorId === targetTopic.id)
      .map(treePath => treePath.descendantId);

    const descendantTopics = topics.filter(topic => descendantTopicIds.includes(topic.id));
    return descendantTopics;
  }

  filterFollowTopics(topic) {
    // フォロー状態にする自分の子孫を探す
    const descendantTopics = this.filterDescendantTopics(topic);

    // トピックは複数の親を持つ可能性がある。
    // フォロー状態にすることによって、子孫が持つ別の先祖トピックもフォロー状態にする必要性が出てくる場合がある
    let otherParentfollowTopics = [];
    descendantTopics.forEach(descendant => {
      const followTopics = this.filterFollowTopics(descendant);
      otherParentfollowTopics = otherParentfollowTopics.concat(followTopics);
    });

    // フォロー状態にする先祖の要素を追加
    const followingAncestorTopics = this.filterFollowAncestorTopics(topic);
    let followTopics = descendantTopics.concat(followingAncestorTopics);
    // フォロー対象に自分を追加
    followTopics = followTopics.concat(topic);

    // フォロー対象に子孫が持つ別の先祖トピックも追加
    followTopics = followTopics.concat(otherParentfollowTopics);

    return followTopics;
  }

  filterUnfollowTopics(topic) {
    // フォロー解除にする自分の子孫を探す
    const descendantTopics = this.filterDescendantTopics(topic);

    // トピックは複数の親を持つ可能性がある。
    // フォロー解除にすることによって、子孫が持つ別の先祖トピックもフォロー解除にする必要性が出てくる場合がある
    let otherParentUnfollowTopics = [];
    descendantTopics.forEach(descendant => {
      const unfollowTopics = this.filterUnfollowTopics(descendant);
      otherParentUnfollowTopics = otherParentUnfollowTopics.concat(unfollowTopics);
    });

    // フォロー解除にする先祖の要素を追加
    const ancestorTopics = this.filterAncestorTopics(topic);
    let unfollowTopics = descendantTopics.concat(ancestorTopics);
    // フォロー解除対象に自分を追加
    unfollowTopics = unfollowTopics.concat(topic);
    // フォロー解除対象に子孫が持つ別の先祖トピックも追加
    unfollowTopics = unfollowTopics.concat(otherParentUnfollowTopics);
    return unfollowTopics;
  }

  filterSiblingTopics(targetTopicId) {
    const topics = this.topics.toArray();
    const topicTreePathes = this.topicTreePathes.toArray();
    const siblingTopicIds = topicTreePathes
      .filter(treePath => treePath.ancestorId === targetTopicId)
      .filter(treePath => treePath.isParental())
      .map(treePath => treePath.descendantId);

    return topics.filter(topic => siblingTopicIds.includes(topic.id));
  }

  /**
   * 対象のトピックの親とその先祖について、
   * フォロー対象に含めるべき先祖のトピックを取得します。
   */
  filterFollowAncestorTopics(targetTopic) {
    // もし自分の兄弟要素がすべてフォロー中だったら、自分の親要素をフォロー対象に追加
    let resultTopics = [];
    const topics = this.topics.toArray();
    const topicTreePathes = this.topicTreePathes.toArray();

    const parentTopicIds = topicTreePathes
      .filter(treePath => treePath.descendantId === targetTopic.id)
      .filter(treePath => treePath.isParental())
      .map(treePath => treePath.ancestorId);

    parentTopicIds.forEach(parentTopicId => {
      const siblingTopics = this.filterSiblingTopics(parentTopicId);
      const isFollowParent = siblingTopics
        // 自分自身以外の兄弟要素についてフォロー中かどうか確認
        .filter(sibling => sibling.id !== targetTopic.id)
        .every(sibling => sibling.isFollow);

      if (isFollowParent) {
        const parentTopic = topics.find(topic => topic.id === parentTopicId);
        if (parentTopic) {
          resultTopics.push(parentTopic);
          // さらに祖先の要素も再帰的にフォロー対象に追加
          const ancestorTopics = this.filterFollowAncestorTopics(parentTopic);
          resultTopics = resultTopics.concat(ancestorTopics);
        }
      }
    });

    return resultTopics;
  }
}
