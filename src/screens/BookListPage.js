import React from 'react';
import CardList from '../components/CardList';
import BookAPI from '../api/BookAPI';
import AppBarNavigation from '../components/AppBarNavigation';
var ls = require('local-storage');

class BookListPage extends React.Component {
  constructor(props) {
    super(props);
    this.bookAPI = new BookAPI();
    this.state = {
      isLoading: false,
      books: [],
    };
  }

  componentDidMount() {
    this.loadBookList();
  }

  loadBookList() {
    this.bookAPI
      .getBookList()
      .then(response => {
        this.setState({
          books: response,
        });
      })
      .catch(error => {
        alert(
          'There was an error fetching data, try again later' +
            JSON.stringify(error)
        );
      });
  }

  getBadgeCounter() {
    var item = ls.get('cartBooks');
    return item.length;
  }

  render() {
    return (
      <>
        <AppBarNavigation badgeCounter={this.getBadgeCounter()} />
        <div style={{ minWidth: '50%', marginBottom: 8 }}>
          <main
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardList books={this.state.books} />
          </main>
        </div>
      </>
    );
  }
}

export default BookListPage;
