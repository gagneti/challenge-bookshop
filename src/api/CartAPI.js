import CartFacade from './cart/CartFacade';

export default class CartAPI {
  constructor() {
    return new CartFacade();
  }
}
