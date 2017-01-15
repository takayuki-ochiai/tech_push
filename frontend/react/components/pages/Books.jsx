import React, { Component } from 'react';
import {
  Card,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';

class Books extends Component {
  render() {
    const books = this.props.store.books;
    const bookCards = books.map(book => (
      <a
        href={book.itemUrl}
        key={book.id}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Card
          style={{
            width: 250,
            maxHeight: 480,
            margin: 10
          }}
        >
          <CardMedia
            mediaStyle={{
              width: 250,
              maxHeight: 300,
              overflow: 'hidden'
            }}
          >
            <img
              src={book.largeImageUrl}
              alt={book.title}
            />
          </CardMedia>
          <CardTitle
            title={book.title}
            subtitle={book.author}
            titleStyle={{
              fontSize: 16,
              lineHeight: '24px'
            }}
          />
        </Card>
      </a>
    ));
    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          {bookCards}
        </div>
      </div>
    );
  }
}

Books.propTypes = {
};

export default Books;
