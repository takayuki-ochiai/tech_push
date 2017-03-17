import React, { Component } from 'react';
import {
  List,
  ListItem
} from 'material-ui/List';

class Notices extends Component {
  render() {
    const notices = this.props.store.notices;
    const noticeListItems = notices.map(notice => (
      <ListItem
        key={notice.id}
        primaryText={notice.book.title}
        secondaryText={
          <div>
            <p>{notice.contents}</p>
            <p>{notice.notifyDate}通知</p>
          </div>
        }
        secondaryTextLines={2}
        onTouchTap={event => {
          event.preventDefault();
          window.open(notice.linkUrl, '_blank');
        }}
      />
    ));
    return (
      <List>
        {noticeListItems}
      </List>
    );
  }
}

Notices.propTypes = {
};

export default Notices;
