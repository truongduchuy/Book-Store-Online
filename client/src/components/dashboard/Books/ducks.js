import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_RESPONSE = 'BOOKS_RESPONSE';

export const BOOK_ADD_REQUEST = 'BOOK_ADD_REQUEST';
export const BOOK_ADD_RESPONSE = 'BOOK_ADD_RESPONSE';

export const BOOK_DELETE_REQUEST = 'BOOK_DELETE_REQUEST';
export const BOOK_DELETE_RESPONSE = 'BOOK_DELETE_RESPONSE';

export const BOOK_EDIT_REQUEST = 'BOOK_EDIT_REQUEST';
export const BOOK_EDIT_RESPONSE = 'BOOK_EDIT_RESPONSE';

function* requestBooks(action) {
  try {
    const { page, size, searchValue } = action.payload;
    const search = searchValue ? `&searchValue=${searchValue}` : '';

    const response = yield call(callApi, 'GET', `/api/books?page=${page}&size=${size}${search}`);

    if (response) yield put(createAction(BOOKS_RESPONSE, response));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestBooks() {
  yield takeLatest(BOOKS_REQUEST, requestBooks);
}

function* addBook(action) {
  const { callBack, ...data } = action.payload;
  try {
    const formData = new FormData();
    for (let key in action.payload) {
      formData.append(key, data[key]);
    }

    const response = yield call(callApi, 'POST', `/api/books`, formData);

    if (response) yield put(createAction(BOOK_ADD_RESPONSE, response));

    callBack(response);
  } catch (error) {
    console.log(error);
    callBack();
  }
}

function* watchAddBook() {
  yield takeLatest(BOOK_ADD_REQUEST, addBook);
}

function* deleteBook(action) {
  try {
    const response = yield call(callApi, 'DELETE', `/api/books/${action.payload}`);

    if (response) yield put(createAction(BOOK_DELETE_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteBook() {
  yield takeLatest(BOOK_DELETE_REQUEST, deleteBook);
}

const initBook = { books: { total: 0, data: [] }, isWaitingBooks: false, isWaitingAdd: false };

const bookActionHandlers = {
  [BOOKS_REQUEST]: state => ({ ...state, isWaitingBooks: true }),
  [BOOKS_RESPONSE]: (state, action) => ({ ...state, isWaitingBooks: false, books: action.payload }),
  [BOOK_ADD_REQUEST]: (state, action) => ({ ...state, isWaitingAdd: true }),
  [BOOK_ADD_RESPONSE]: (state, action) => {
    let { data } = state.books;
    const newBooks = [...data, action.payload];
    return {
      ...state,
      books: {
        total: state.books.total + 1,
        data: data.length < process.env.REACT_APP_PAGE_SIZE ? newBooks : data,
      },
      isWaitingAdd: false,
    };
  },

  [BOOK_DELETE_RESPONSE]: (state, action) => {
    let data = state.books.data.filter(item => item._id !== action.payload);

    return {
      ...state,
      books: {
        total: state.books.total - 1,
        data,
      },
    };
  },
};

export const bookReducer = createReducer(initBook, bookActionHandlers);
export const bookSagas = [
  fork(watchAddBook),
  fork(watchRequestBooks),
  fork(watchDeleteBook),
  // fork(watchEditGenre),
];
