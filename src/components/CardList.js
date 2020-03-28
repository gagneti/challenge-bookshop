import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { styled } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const books = this.props.books;
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
              <CardActions>
                <Button size="small">Book in detail</Button>
              </CardActions>
            </MyCard>
          );
        })}
      </>
    );
  }
}

const MyCard = styled(Card)({
  minWidth: '50%',
  marginBottom: 8,
});

const SecondaryText = styled(Typography)({
  fontSize: 14,
});

export default CardList;
