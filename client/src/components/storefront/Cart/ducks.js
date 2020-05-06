import { createReducer } from 'dorothy/utils';

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const GET_CART = 'GET_CART';

const setItem = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    return false;
  }
};

const initCart = {
  // cart: [{book: {}, quantity: 0, _id: null}],
  cart: [],
};

const cartActionHandlers = {
  [ADD_TO_CART]: (state, action) => {
    const { quantityAdded, book } = action.payload;
    let cart = [];
    const bookisNotExistedInCart = state.cart.every(item => item._id !== book._id);

    if (bookisNotExistedInCart) {
      cart = [...state.cart, { _id: book._id, book, quantity: quantityAdded }];
    } else {
      cart = state.cart.map(item =>
        item._id === book._id
          ? { ...item, quantity: Number(item.quantity) + Number(quantityAdded) }
          : item,
      );
    }
    setItem('cart', cart);

    return { ...state, cart };
  },
  [REMOVE_ITEM]: (state, action) => {
    const cart = state.cart.filter(item => item._id !== action.payload);
    setItem('cart', cart);
    return {
      ...state,
      cart,
    };
  },
  [GET_CART]: (state, action) => {
    return {
      ...state,
      cart: action.payload,
    };
  },
  [UPDATE_CART]: (state, action) => {
    const { _id, quantity } = action.payload;
    let cart = [];
    const currentBook = state.cart.find(({ _id: bookId }) => bookId === _id);

    const quantityValid = quantity > 0 && currentBook?.book?.quantity >= quantity;

    if (quantityValid) {
      cart = state.cart.map(item => (item._id === _id ? { ...item, quantity } : item));
      setItem('cart', cart);
      return {
        ...state,
        cart,
      };
    }
    return state;
  },
};

export const cartReducer = createReducer(initCart, cartActionHandlers);