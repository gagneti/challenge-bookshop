import React from 'react';
import BookListPage from './screens/BookListPage';
import CartPage from './screens/CartPage';
import BookDetailPage from './screens/BookDetailPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ minWidth: '50%', marginBottom: 8 }}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/list" />
            <Route exact path="/list">
              <ShowBookList />
            </Route>
            <Route path="/cart">
              <ShowCart />
            </Route>
            <Route path="/detail">
              <ShowBookDetail />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function ShowBookList() {
  return <BookListPage />;
}

function ShowCart() {
  return <CartPage />;
}

function ShowBookDetail() {
  return <BookDetailPage />;
}

export default App;
