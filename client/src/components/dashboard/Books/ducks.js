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

export const REVIEWS_REQUEST = 'REVIEWS_REQUEST';
export const REVIEWS_RESPONSE = 'REVIEWS_RESPONSE';

export const REVIEW_UPDATE_REQUEST = 'REVIEW_UPDATE_REQUEST';
export const REVIEW_UPDATE_RESPONSE = 'REVIEW_UPDATE_RESPONSE';

export const REVIEW_DELETE_REQUEST = 'REVIEW_DELETE_REQUEST';
export const REVIEW_DELETE_RESPONSE = 'REVIEW_DELETE_RESPONSE';

export const BOOK_DETAILS_REQUEST = 'BOOK_DETAILS_REQUEST';
export const BOOK_DETAILS_RESPONSE = 'BOOK_DETAILS_RESPONSE';

export const REVIEW_CREATE_REQUEST = 'REVIEW_CREATE_REQUEST';
export const REVIEW_CREATE_RESPONSE = 'REVIEW_CREATE_RESPONSE';

export const REQUEST_ERROR = 'REQUEST_ERROR';

function* requestBooks(action) {
  try {
    const { page, size, searchValue, genreId } = action.payload;
    const search = searchValue ? `searchValue=${searchValue}` : '';
    const genre = genreId ? `genreId=${genreId}` : '';

    const response = yield call(
      callApi,
      'GET',
      `/api/books?page=${page}&size=${size}&${search}&${genre}`,
    );

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

function* requestReviews(action) {
  try {
    const { id, page, size } = action.payload;
    const query = `page=${page}&size=${size}`;
    const response = yield call(callApi, 'GET', `/api/reviews/${id}?${query}`);

    if (response) yield put(createAction(REVIEWS_RESPONSE, response));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchRequestReviews() {
  yield takeLatest(REVIEWS_REQUEST, requestReviews);
}

function* deleteReview(action) {
  try {
    const response = yield call(callApi, 'DELETE', `/api/reviews/${action.payload.id}`);

    if (response) yield put(createAction(REVIEW_DELETE_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchDeleteReview() {
  yield takeLatest(REVIEW_DELETE_REQUEST, deleteReview);
}

function* requestBookDetails(action) {
  try {
    const response = yield call(callApi, 'GET', `/api/books/${action.payload}`);

    if (response) yield put(createAction(BOOK_DETAILS_RESPONSE, response));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchBookDetailsRequest() {
  yield takeLatest(BOOK_DETAILS_REQUEST, requestBookDetails);
}

function* createReviewRequest(action) {
  try {
    const response = yield call(callApi, 'POST', `/api/reviews`, action.payload);
    if (response) yield put(createAction(REVIEW_CREATE_RESPONSE, response));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchCreateReviewRequest() {
  yield takeLatest(REVIEW_CREATE_REQUEST, createReviewRequest);
}

function* updateReview(action) {
  try {
    const { _id, ...data } = action.payload;
    const response = yield call(callApi, 'PATCH', `/api/reviews/${_id}`, data);
    if (response && response.success)
      yield put(createAction(REVIEW_UPDATE_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
    yield put(createAction(REQUEST_ERROR));
  }
}

function* watchUpdateReviewRequest() {
  yield takeLatest(REVIEW_UPDATE_REQUEST, updateReview);
}

const initBook = {
  books: { total: 0, data: [] },
  reviewData: [],
  isWaitingBooks: false,
  isWaitingAdd: false,
  isWaitingUpdate: false,
  isWaitingReviews: false,
  bookDetails: {},
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
  [REVIEWS_REQUEST]: state => ({
    ...state,
    isWaitingReviews: true,
  }),
  [REVIEWS_RESPONSE]: (state, action) => {
    const { bookId } = action.payload;

    let newReviewData = [];
    const bookIdIsNotExisted = state.reviewData.every(item => item.bookId !== bookId);

    if (bookIdIsNotExisted) {
      newReviewData = [...state.reviewData, action.payload];
    } else {
      newReviewData = state.reviewData.map(item =>
        item.bookId === bookId ? action.payload : item,
      );
    }

    return {
      ...state,
      reviewData: newReviewData,
      isWaitingReviews: false,
    };
  },
  [REVIEW_DELETE_RESPONSE]: (state, action) => {
    return {
      ...state,
      reviewData: state.reviewData.map(item =>
        item.bookId === action.payload.bookId
          ? {
              ...item,
              total: item.total - 1,
              reviews: item.reviews.filter(i => i._id !== action.payload.id),
            }
          : item,
      ),
    };
  },
  [BOOK_DETAILS_RESPONSE]: (state, action) => {
    return {
      ...state,
      bookDetails: action.payload,
    };
  },
  [REVIEW_CREATE_RESPONSE]: (state, action) => {
    return {
      ...state,
      bookDetails: {
        ...state.bookDetails,
        reviews: [action.payload, ...state.bookDetails.reviews],
      },
    };
  },
  [REVIEW_UPDATE_RESPONSE]: (state, action) => {
    const { _id, heading, body, rate } = action.payload;
    return {
      ...state,
      bookDetails: {
        ...state.bookDetails,
        reviews: state.bookDetails.reviews.map(review =>
          review._id === _id ? { ...review, heading, body, rate } : review,
        ),
      },
    };
  },
  [REQUEST_ERROR]: state => ({
    ...state,
    isWaitingBooks: false,
    isWaitingAdd: false,
    isWaitingUpdate: false,
    isWaitingReviews: false,
  }),
};

export const bookReducer = createReducer(initBook, bookActionHandlers);
export const bookSagas = [
  fork(watchAddBook),
  fork(watchRequestBooks),
  fork(watchDeleteBook),
  fork(watchUpdateBook),
  fork(watchRequestReviews),
  fork(watchDeleteReview),
  fork(watchBookDetailsRequest),
  fork(watchCreateReviewRequest),
  fork(watchUpdateReviewRequest),
];
