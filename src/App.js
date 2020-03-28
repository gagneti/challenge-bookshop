import React from 'react';
import BookListPage from './screens/BookListPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <BookListPage />
      </>
    );
  }
}

export default App;
