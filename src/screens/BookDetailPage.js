import React from 'react';
import Card from '@material-ui/core/Card';
import { styled } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import BookAPI from '../api/BookAPI';
import AppBarNavigation from '../components/AppBarNavigation';
import { object } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
var ls = require('local-storage');
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class BookDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.bookAPI = new BookAPI();
    this.state = {
      isLoading: false,
      book: object,
      isSnackbarShowed: false,
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

  addToCart(e) {
    if (e) {
      this.setState({ isSnackbarShowed: true });

      var booksInCart = ls.get('cartBooks');

      if (booksInCart) {
        booksInCart.push(ls.get('selectedBook'));
      } else {
        booksInCart = [];
        booksInCart.push(ls.get('selectedBook'));
      }

      ls.set('cartBooks', booksInCart);
    }
  }

  getBadgeCounter() {
    var item = ls.get('cartBooks');
    return item.length;
  }

  closeSnackbar(e) {
    if (e) {
      this.setState({ isSnackbarShowed: false });
    }
  }

  render() {
    let book = ls('selectedBook');

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
            <MyCard key={book.id}>
              <MyCardContent>
                <Typography variant="h5" component="h2">
                  {'Title: ' + book.Title}
                </Typography>
                <SecondaryText color="textSecondary" gutterBottom>
                  {'Author: ' + book.Author}
                </SecondaryText>
                <SecondaryText color="textSecondary" gutterBottom>
                  {'Genre: ' + book.Genre}
                </SecondaryText>
                <SecondaryText color="textSecondary" gutterBottom>
                  {'SubGenre: ' + book.SubGenre}
                </SecondaryText>
                <SecondaryText color="textSecondary" gutterBottom>
                  {'Height: ' + book.Height}
                </SecondaryText>
                <SecondaryText color="textSecondary" gutterBottom>
                  {'Publisher: ' + book.Publisher}
                </SecondaryText>
                <Button
                  style={{ marginTop: 40, alignSelf: 'flex-end' }}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={e => this.addToCart(e)}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to cart
                </Button>
              </MyCardContent>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.isSnackbarShowed}
                onClose={e => this.closeSnackbar(e)}
                message="Book succesfully added to the cart!"
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={e => this.closeSnackbar(e)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </MyCard>
          </main>
        </div>
      </>
    );
  }
}

const MyCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const MyCard = styled(Card)({
  minWidth: '50%',
  marginBottom: 8,
});

const SecondaryText = styled(Typography)({
  marginTop: 12,
  fontSize: 18,
});

export default BookDetailPage;
