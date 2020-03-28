import axios from 'axios';

//Constants
const BASE_URL = 'http://localhost:3000';
const SERVICE_TIMEOUT = 30000;

const BOOKS_ENDPOINT = '/api/books';

export default class BookService {
  constructor() {
    const booksReq = axios.create({
      baseURL: BASE_URL,
      timeout: SERVICE_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //Interceptors
    const requestInterceptor = async config => {
      console.log('REQUEST ==> ' + JSON.stringify(config));
      return config;
    };

    const requestInterceptorError = async error => {
      return Promise.reject(error);
    };

    booksReq.interceptors.request.use(
      requestInterceptor,
      requestInterceptorError
    );

    const responseInterceptor = async config => {
      console.log('RESPONSE ==> ' + JSON.stringify(config));
      return config;
    };

    const responseInterceptorError = async error => {
      const errorCode = error.response ? error.response.status : null;

      switch (errorCode) {
        case 404:
          // TODO: handle error codes (401, 404..)
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    };

    booksReq.interceptors.response.use(
      responseInterceptor,
      responseInterceptorError
    );

    this.booksReq = booksReq;
  }

  async getBooks() {
    try {
      const response = await this.booksReq.get(BOOKS_ENDPOINT);
      if (response !== undefined) {
        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
