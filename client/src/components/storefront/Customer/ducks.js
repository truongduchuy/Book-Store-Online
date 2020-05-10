import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const REGISTATION_REQUEST = 'REGISTATION_REQUEST';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REPONSE = 'LOGIN_REPONSE';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_RESPONSE = 'GET_ORDERS_RESPONSE';

export const CUSTOMER_UPDATE_REQUEST = 'CUSTOMER_UPDATE_REQUEST';
export const CUSTOMER_UPDATE_RESPONSE = 'CUSTOMER_UPDATE_RESPONSE';

export const CUSTOMER_CHANGE_PASSWORD_REQUEST = 'CUSTOMER_CHANGE_PASSWORD_REQUEST';

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

function* updateCustomer(action) {
  const { callBack, ...data } = action.payload;

  try {
    const response = yield call(callApi, 'PATCH', `/api/customers`, data);

    if (response) {
      yield put(createAction(CUSTOMER_UPDATE_RESPONSE, response));
      callBack(true);
    } else callBack(false);
  } catch (error) {
    yield put(createAction(CUSTOMER_REQUEST_ERROR));
    callBack(false);
  }
}

function* watchUpdateCustomer() {
  yield takeLatest(CUSTOMER_UPDATE_REQUEST, updateCustomer);
}

function* changePassword(action) {
  const { callBack, ...data } = action.payload;
  console.log(action.payload);
  try {
    const response = yield call(callApi, 'PATCH', `/api/customers/changePass`, data);
    console.log(response);
    if (response && response.success) {
      callBack(true);
    } else callBack(false);
  } catch (error) {
    yield put(createAction(CUSTOMER_REQUEST_ERROR));
    callBack(false);
  }
}

function* watchChangePassword() {
  yield takeLatest(CUSTOMER_CHANGE_PASSWORD_REQUEST, changePassword);
}

function* getOrders() {
  try {
    const response = yield call(callApi, 'GET', `/api/customers/orders`);
    if (response) {
      yield put(createAction(GET_ORDERS_RESPONSE, response));
    } else throw new Error();
  } catch (error) {
    yield put(createAction(CUSTOMER_REQUEST_ERROR));
  }
}

function* watchOrdersRequest() {
  yield takeLatest(GET_ORDERS_REQUEST, getOrders);
}

const initCustomer = {
  customer: {},
  token: null,
  orders: [],
  isWaitingOrders: false,
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
  [CUSTOMER_UPDATE_RESPONSE]: (state, action) => {
    const { token } = state;

    localStorage.setItem('customerData', JSON.stringify({ customer: action.payload, token }));
    return { ...state, customer: action.payload };
  },
  [GET_ORDERS_REQUEST]: state => ({ ...state, isWaitingOrders: true }),
  [GET_ORDERS_RESPONSE]: (state, action) => {
    const orders = action.payload.map(order => ({
      ...order,
      orderTotal: order.cart.reduce(
        (acc, { bookId, quantity }) => acc + Number(bookId.price) * Number(quantity),
        0,
      ),
    }));
    return { ...state, orders, isWaitingOrders: false };
  },
  [CUSTOMER_REQUEST_ERROR]: state => ({ ...state, isWaitingOrders: false }),
};

export const customerReducer = createReducer(initCustomer, customerActionHandlers);
export const customerSagas = [
  fork(watchRegistationRequest),
  fork(watchLoginRequest),
  fork(watchUpdateCustomer),
  fork(watchChangePassword),
  fork(watchOrdersRequest),
];
