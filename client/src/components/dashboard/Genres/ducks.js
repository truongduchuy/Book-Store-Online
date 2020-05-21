import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const GENRES_REQUEST = 'GENRES_REQUEST';
export const GENRES_RESPONSE = 'GENRES_RESPONSE';

export const GENRE_ADD_REQUEST = 'GENRE_ADD_REQUEST';
export const GENRE_ADD_RESPONSE = 'GENRE_ADD_RESPONSE';

export const GENRE_DELETE_REQUEST = 'GENRE_DELETE_REQUEST';
export const GENRE_DELETE_RESPONSE = 'GENRE_DELETE_RESPONSE';

export const GENRE_EDIT_REQUEST = 'GENRE_EDIT_REQUEST';
export const GENRE_EDIT_RESPONSE = 'GENRE_EDIT_RESPONSE';

export const SEARCH_VALUE_CHANGE = 'SEARCH_VALUE_CHANGE';

function* addGenre(action) {
  try {
    const response = yield call(callApi, 'POST', '/api/genres', action.payload);

    if (response) yield put(createAction(GENRE_ADD_RESPONSE, response));
  } catch (error) {
    console.log(error);
  }
}

function* watchAddGenre() {
  yield takeLatest(GENRE_ADD_REQUEST, addGenre);
}

function* requestGenres() {
  try {
    const response = yield call(callApi, 'GET', '/api/genres');

    if (response) yield put(createAction(GENRES_RESPONSE, response));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestGenres() {
  yield takeLatest(GENRES_REQUEST, requestGenres);
}

function* deleteGenre(action) {
  try {
    const response = yield call(callApi, 'DELETE', `/api/genres/${action.payload}`);

    if (response) yield put(createAction(GENRE_DELETE_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteGenre() {
  yield takeLatest(GENRE_DELETE_REQUEST, deleteGenre);
}

function* editGenre(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(callApi, 'PATCH', `/api/genres/${id}`, data);

    console.log(response);
    if (response) yield put(createAction(GENRE_EDIT_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchEditGenre() {
  yield takeLatest(GENRE_EDIT_REQUEST, editGenre);
}
const initGenre = { genres: [], isWaitingGenres: false };
const genreActionHandlers = {
  [GENRE_ADD_RESPONSE]: (state, action) => {
    const genres = [...state.genres, action.payload];
    return {
      ...state,
      genres,
      allGenres: genres,
    };
  },
  [GENRE_DELETE_RESPONSE]: (state, action) => {
    const genres = state.genres.filter(genre => genre._id !== action.payload);
    return {
      ...state,
      genres,
      allGenres: genres,
    };
  },
  [GENRE_EDIT_RESPONSE]: (state, action) => {
    const genres = state.genres.map(genre =>
      genre._id === action.payload.id ? { _id: action.payload.id, ...action.payload.data } : genre,
    );
    return {
      ...state,
      genres,
      allGenres: genres,
    };
  },
  [GENRES_REQUEST]: state => ({
    ...state,
    isWaitingGenres: true,
  }),
  [GENRES_RESPONSE]: (state, action) => {
    const genres = action.payload;
    return {
      ...state,
      genres,
      allGenres: genres,
      isWaitingGenres: false,
    };
  },
  [SEARCH_VALUE_CHANGE]: (state, action) => ({
    ...state,
    genres: state.allGenres.filter(
      genre => genre.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1,
    ),
  }),
};

export const genreReducer = createReducer(initGenre, genreActionHandlers);
export const genreSagas = [
  fork(watchAddGenre),
  fork(watchRequestGenres),
  fork(watchDeleteGenre),
  fork(watchEditGenre),
];
