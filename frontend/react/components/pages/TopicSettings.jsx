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
    const topics = store.topics;
    return topics.some(topic => targetTopic.id === topic.parentId);
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
          event.preventDefault();
          if (topic.isFollow) {
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
      listFilter = topic => topic.parentId === parentId;
    } else {
      listFilter = topic => !topic.parentId;
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
