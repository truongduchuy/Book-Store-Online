import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';
import { handleApiError } from 'dorothy/utils/logger';

/* preference state */
export const PREFERENCE_REQUEST = 'PREFERENCE_REQUEST';
export const PREFERENCE_RESPONSE = 'PREFERENCE_RESPONSE';
export const PREFERENCE_ERROR = 'PREFERENCE_ERROR';

export const USER_ADD_REQUEST = 'USER_ADD_REQUEST';
export const USER_ADD_RESPONSE = 'USER_ADD_RESPONSE';
export const USER_ADD_ERROR = 'USER_ADD_ERROR';

function* requestPreference() {
  try {
    const response = yield call(callApi, 'GET', '/api/test');
    console.log(response);
    if (response) yield put(createAction(PREFERENCE_RESPONSE, response));
    // else yield put(createAction(PREFERENCE_ERROR, API_ERROR_MESSAGE));
  } catch (error) {
    yield put(createAction(PREFERENCE_ERROR, error));
  }
}

function* addUser(action) {
  try {
    console.log(action);
    const response = yield call(callApi, 'POST', '/api/users', action.payload);

    console.log(response);
    if (response) yield put(createAction(USER_ADD_RESPONSE, response));
  } catch (error) {
    console.log(error);
    yield put(createAction(PREFERENCE_ERROR, error));
  }
}

function* watchPreferenceRequest() {
  yield takeLatest(PREFERENCE_REQUEST, requestPreference);
}

function* watchAddUserRequest() {
  yield takeLatest(USER_ADD_REQUEST, addUser);
}

const initPreference = { preference: null };
const preferenceActionHandlers = {
  [PREFERENCE_RESPONSE]: (state, action) => ({
    ...state,
    preference: action.payload,
  }),
  [PREFERENCE_ERROR]: handleApiError,
  [USER_ADD_RESPONSE]: (state, action) => ({ ...state, users: action.payload }),
  [USER_ADD_ERROR]: handleApiError,
};

export const preferenceReducer = createReducer(initPreference, preferenceActionHandlers);
export const preferenceSagas = [fork(watchPreferenceRequest), fork(watchAddUserRequest)];
