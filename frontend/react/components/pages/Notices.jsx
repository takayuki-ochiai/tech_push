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
        secondaryText={notice.contents}
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
