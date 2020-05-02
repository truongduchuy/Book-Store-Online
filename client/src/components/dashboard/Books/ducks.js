import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_RESPONSE = 'BOOKS_RESPONSE';

export const BOOK_ADD_REQUEST = 'BOOK_ADD_REQUEST';
export const BOOK_ADD_RESPONSE = 'BOOK_ADD_RESPONSE';

export const BOOK_DELETE_REQUEST = 'BOOK_DELETE_REQUEST';
export const BOOK_DELETE_RESPONSE = 'BOOK_DELETE_RESPONSE';

export const BOOK_UPDATE_REQUEST = 'BOOK_UPDATE_REQUEST';
export const BOOK_UPDATE_RESPONSE = 'BOOK_UPDATE_RESPONSE';

export const REQUEST_ERROR = 'REQUEST_ERROR';

function* requestBooks(action) {
  try {
    const { page, size, searchValue } = action.payload;
    const search = searchValue ? `&searchValue=${searchValue}` : '';

    const response = yield call(callApi, 'GET', `/api/books?page=${page}&size=${size}${search}`);

    if (response) yield put(createAction(BOOKS_RESPONSE, response));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchRequestBooks() {
  yield takeLatest(BOOKS_REQUEST, requestBooks);
}

function* addBook(action) {
  const { callBack, ...data } = action.payload;
  try {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    const response = yield call(callApi, 'POST', `/api/books`, formData);

    if (response) yield put(createAction(BOOK_ADD_RESPONSE, response));

    callBack(response);
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
    callBack();
  }
}

function* watchAddBook() {
  yield takeLatest(BOOK_ADD_REQUEST, addBook);
}

function* deleteBook(action) {
  const { callBack, id } = action.payload;
  try {
    const response = yield call(callApi, 'DELETE', `/api/books/${id}`);

    if (response) yield put(createAction(BOOK_DELETE_RESPONSE, id));
    callBack(response);
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
    callBack();
  }
}

function* watchDeleteBook() {
  yield takeLatest(BOOK_DELETE_REQUEST, deleteBook);
}

function* updateBook(action) {
  const { callBack, _id, ...data } = action.payload;

  const formData = new FormData();
  for (let key in data) {
    if (key !== 'image' || data[key]) formData.append(key, data[key]);
  }

  try {
    const response = yield call(callApi, 'PATCH', `/api/books/${_id}`, formData);

    if (response) yield put(createAction(BOOK_UPDATE_RESPONSE, response));
    console.log(response);
    callBack(response);
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
    callBack();
  }
}

function* watchUpdateBook() {
  yield takeLatest(BOOK_UPDATE_REQUEST, updateBook);
}

const initBook = {
  books: { total: 0, data: [] },
  isWaitingBooks: false,
  isWaitingAdd: false,
  isWaitingUpdate: false,
};

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
  [BOOK_UPDATE_REQUEST]: (state, action) => ({ ...state, isWaitingUpdate: true }),
  [BOOK_UPDATE_RESPONSE]: (state, action) => {
    return {
      ...state,
      books: {
        ...state.books,
        data: state.books.data.map(book =>
          book._id === action.payload._id ? action.payload : book,
        ),
      },
      isWaitingUpdate: false,
    };
  },
  [BOOK_DELETE_RESPONSE]: (state, action) => {
    console.log();
    let data = state.books.data.filter(item => item._id !== action.payload);

    return {
      ...state,
      books: {
        total: state.books.total - 1,
        data,
      },
    };
  },
  [REQUEST_ERROR]: state => ({
    ...state,
    isWaitingBooks: false,
    isWaitingAdd: false,
    isWaitingUpdate: false,
  }),
};

export const bookReducer = createReducer(initBook, bookActionHandlers);
export const bookSagas = [
  fork(watchAddBook),
  fork(watchRequestBooks),
  fork(watchDeleteBook),
  fork(watchUpdateBook),
];
