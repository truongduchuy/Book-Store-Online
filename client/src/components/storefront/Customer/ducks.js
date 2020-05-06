import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const REGISTATION_REQUEST = 'REGISTATION_REQUEST';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REPONSE = 'LOGIN_REPONSE';

export const LOGOUT = 'LOGOUT';
export const GET_DATA_FROM_LOCAL = 'GET_DATA_FROM_LOCAL';

export const CUSTOMER_REQUEST_ERROR = 'CUSTOMER_REQUEST_ERROR';

function* requestRegistation(action) {
  const { history, callBack, ...newCustomer } = action.payload;
  try {
    const response = yield call(callApi, 'POST', `/api/customers/register`, newCustomer);
    console.log(response);
    if (response) {
      history.push('/login');
      callBack(true);
    } else {
      callBack(false);
    }
  } catch (error) {
    console.log(error);
    yield put(createAction(CUSTOMER_REQUEST_ERROR));
    callBack(false);
  }
}

function* watchRegistationRequest() {
  yield takeLatest(REGISTATION_REQUEST, requestRegistation);
}

function* requestLogin(action) {
  const { history, callBack, ...data } = action.payload;
  console.log('action.payload', action.payload);
  try {
    const response = yield call(callApi, 'POST', `/api/customers/login`, data);

    if (response) {
      yield put(createAction(LOGIN_REPONSE, response));
      history.push('/cart');
      callBack(true);
    } else callBack(false);
  } catch (e) {
    yield put(createAction(CUSTOMER_REQUEST_ERROR));
    callBack(false);
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
}
const initCustomer = {
  customer: {},
  token: null,
};
const customerActionHandlers = {
  [LOGIN_REPONSE]: (state, action) => {
    const { customer, token } = action.payload;
    localStorage.setItem('customerData', JSON.stringify(action.payload));
    return { ...state, customer, token };
  },
  [LOGOUT]: state => {
    localStorage.removeItem('customerData');
    return { ...state, customer: {}, token: null };
  },
  [GET_DATA_FROM_LOCAL]: (state, action) => {
    const { token, customer } = action.payload || {};
    return { ...state, token, customer };
  },
};

export const customerReducer = createReducer(initCustomer, customerActionHandlers);
export const customerSagas = [fork(watchRegistationRequest), fork(watchLoginRequest)];
