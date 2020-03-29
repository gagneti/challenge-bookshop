import React from 'react';
import CardList from '../components/CardList';
import BookAPI from '../api/BookAPI';
import AppBarNavigation from '../components/AppBarNavigation';
var ls = require('local-storage');

class CartPage extends React.Component {
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
    var cartBooks = ls.get('cartBooks');
    this.setState({ books: cartBooks });
  }

  updateList() {
    var cartBooks = ls.get('cartBooks');

    if (cartBooks === this.state.books) {
      return;
    } else {
      setTimeout(() => {
        this.setState({ books: cartBooks });
      }, 200);
    }
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
            <CardList
              books={this.state.books}
              isInRemovePage={true}
              updateList={this.updateList()}
            />
          </main>
        </div>
      </>
    );
  }
}

export default CartPage;
