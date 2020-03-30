import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { styled } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
var ls = require('local-storage');
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isSnackbarShowed: false,
      isRemoveAllButtonVisible: false,
    };
  }

  saveSelectedBook(e, book) {
    if (e) {
      ls.set('selectedBook', book);
    }
  }

  removeBookFromCart(e, book) {
    if (e) {
      var cart = ls.get('cartBooks');
      var filteredArray = cart.filter(item => {
        return item.Title !== book.Title;
      });

      ls.set('cartBooks', filteredArray);
      this.setState({ books: filteredArray, isSnackbarShowed: true });
      () => this.props.updateList();
    }
  }

  closeSnackbar(e) {
    if (e) {
      this.setState({ isSnackbarShowed: false });
    }
  }

  resetCart(e) {
    if (e) {
      ls.set('cartBooks', []);
      this.setState({ books: [] });
      () => this.props.updateList();
    }
  }

  render() {
    let books = this.props.books;
    return (
      <>
        {Object.keys(books).map(bookIndex => {
          let book = books[bookIndex];
          book.id = bookIndex;

          return (
            <MyCard key={book.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {book.Title}
                </Typography>
                <SecondaryText color="textSecondary" gutterBottom>
                  {book.Author}
                </SecondaryText>
              </CardContent>
              {this.props.isInRemovePage ? (
                <MyCardActions>
                  <MyButton
                    variant="contained"
                    color="secondary"
                    onClick={e => this.removeBookFromCart(e, book)}
                    startIcon={<DeleteIcon />}
                  >
                    Remove from cart
                  </MyButton>
                </MyCardActions>
              ) : (
                <MyCardActions>
                  <Link to={'/detail'}>
                    <MyButton
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={e => this.saveSelectedBook(e, book)}
                      startIcon={<BookOutlinedIcon />}
                    >
                      Book details
                    </MyButton>
                  </Link>
                </MyCardActions>
              )}
            </MyCard>
          );
        })}
        {this.props.books.length > 0 ? (
          <>
            <RemoveAllButton
              variant="contained"
              color="primary"
              size="large"
              onClick={e => this.resetCart(e)}
              startIcon={<RemoveShoppingCartIcon />}
            >
              Remove everything from the cart
            </RemoveAllButton>
            <ProceedToCheckoutButton
              variant="contained"
              color="third"
              size="large"
              startIcon={<PaymentOutlinedIcon />}
            >
              Proceed to checkout
            </ProceedToCheckoutButton>
          </>
        ) : (
          <>
            <Typography style={{ marginTop: 80 }} variant="h4" component="h2">
              Your cart is empty
            </Typography>
            <Link to={'/list'}>
              <MyButton
                style={{ top: 20 }}
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<BookOutlinedIcon />}
              >
                Visit the store page to discover new books
              </MyButton>
            </Link>
          </>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.isSnackbarShowed}
          onClose={e => this.closeSnackbar(e)}
          message="Book removed from the cart!"
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
      </>
    );
  }
}

const MyButton = styled(Button)({
  alignSelf: 'flex-end',
});

const MyCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '50%',
  marginBottom: 8,
});

const SecondaryText = styled(Typography)({
  fontSize: 14,
});

const MyCardActions = styled(CardActions)({
  display: 'flex',
  flexDirection: 'column',
});

const RemoveAllButton = styled(Button)({
  marginTop: 40,
  alignSelf: 'center',
  minWidth: '50%',
});

const ProceedToCheckoutButton = styled(RemoveAllButton)({
  marginTop: 20,
});

export default CardList;
