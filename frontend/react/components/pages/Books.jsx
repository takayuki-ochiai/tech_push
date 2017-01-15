import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';

class Books extends Component {
  render() {
    const books = this.props.store.books;
    const bookListItems = books.map(book => (
      <ListItem
        primaryText={book.title}
        hoverColor="white"
        key={book.id}
        onTouchTap={() => {
        }}
      />
    ));
    return (
      <div>
        <List>
          {bookListItems}
        </List>
      </div>
    );
  }
}

Books.propTypes = {
};

export default Books;
