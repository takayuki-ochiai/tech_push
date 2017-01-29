import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import FlatButton from 'material-ui/FlatButton';


class TopicSettings extends Component {
  onTouchTapListItem(targetTopic) {
    // 該当トピックに1つ以上子供トピックがある場合、下の回想に移動できるようにする
    if (this.hasChildTopic(targetTopic)) {
      this.props.dispatch('goChildTopics', targetTopic.id);
    }
  }

  hasChildTopic(targetTopic) {
    const store = this.props.store;
    const topicTreePathes = store.topicTreePathes;
    return topicTreePathes.some(treePath => (
      treePath.ancestorId !== treePath.descendantId && treePath.ancestorId === targetTopic.id
    ));
  }

  renderRightIcon(targetTopic) {
    if (this.hasChildTopic(targetTopic)) {
      return <ArrowRightIcon color={grey400} />;
    }
    return null;
  }

  renderFollowButton(topic) {
    const label = topic.isFollow ? 'フォロー解除' : 'フォローする';

    return (
      <FlatButton
        label={label}
        onTouchTap={event => {
          event.stopPropagation();
          if (topic.isFollow) {
            this.props.dispatch('unfollowTopic', topic);
          } else {
            this.props.dispatch('followTopic', topic);
          }
        }}
        style={{
          position: 'absolute',
          top: '12%',
          right: '10%'
        }}
        primary={!topic.isFollow}
      />
    );
  }

  render() {
    const store = this.props.store;
    const topics = store.topics;
    let listFilter;
    if (this.props.parentId) {
      const parentId = this.props.parentId;
      const topicTreePathes = store.topicTreePathes;
      // 該当のparentIdのTopicを先祖に持つTopicをフィルタリングする
      // parentIdを先祖idに持つTopicTreePathの子孫idで
      const descendantTopicIds = topicTreePathes
        .filter(treePath => treePath.ancestorId === parentId)
        .map(treePath => treePath.descendantId);

      listFilter = topic => (
        (topic.id !== parentId && descendantTopicIds.includes(topic.id))
      );
    } else {
      // 先祖を持たないTopicを取得する
      listFilter = topic => topic.isFirstTopic();
    }

    const topicListItems = topics
      .filter(listFilter)
      .map(topic => (
        <ListItem
          primaryText={(
            <div>
              {topic.name}
              {this.renderFollowButton(topic)}
            </div>
          )}
          disabled={!this.hasChildTopic(topic)}
          hoverColor="white"
          key={topic.id}
          rightIcon={this.renderRightIcon(topic)}
          onTouchTap={() => {
            this.onTouchTapListItem(topic);
          }}
        />
      ));
    return (
      <div>
        <List>
          {topicListItems}
        </List>
      </div>
    );
  }
}

export default TopicSettings;
