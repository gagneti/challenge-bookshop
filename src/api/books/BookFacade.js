import BookService from './BookService';

export default class BookFacade {
  constructor() {
    this.service = new BookService();
  }

  async getBookList() {
    try {
      let response = await this.service.getBooks();

      let responseData = response.data;
      return responseData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
