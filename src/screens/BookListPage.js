import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styled } from '@material-ui/core/styles';
import CardList from '../components/CardList';
import BookAPI from '../api/BookAPI';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

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

  render() {
    return (
      <div style={{ minWidth: '50%', marginBottom: 8 }}>
        <AppBar position="static">
          <Toolbar>
            <MyIconButton>
              <MenuIcon />
            </MyIconButton>
            <Title>An amazing Book Shop!</Title>
            <MyIconButton>
              <ShoppingCartOutlinedIcon />
            </MyIconButton>
          </Toolbar>
        </AppBar>
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
    );
  }
}

const MyIconButton = styled(IconButton)({
  edge: 'start',
  color: 'inherit',
  marginRight: 10,
});

const Title = styled(Typography)({
  fontSize: 16,
  variant: 'h6',
  flexGrow: 1,
});

export default BookListPage;
