import BookFacade from './books/BookFacade';

export default class BookAPI {
  constructor() {
    return new BookFacade();
  }
}
