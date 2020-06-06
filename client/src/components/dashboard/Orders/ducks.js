import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const ORDERS_REQUEST = 'ORDERS_REQUEST';
export const ORDERS_RESPONSE = 'ORDERS_RESPONSE';

export const ORDER_UPDATE_STATUS_REQUEST = 'ORDER_UPDATE_STATUS_REQUEST';
export const ORDER_UPDATE_STATUS_RESPONSE = 'ORDER_UPDATE_STATUS_RESPONSE';
export const ORDER_UPDATE_STATUS_ERROR = 'ORDER_UPDATE_STATUS_ERROR';

export const ORDER_REQUEST_ERROR = 'ORDER_REQUEST_ERROR';

function* getAllOrders(action) {
  try {
    const { page, size } = action.payload;
    const response = yield call(callApi, 'GET', `/api/orders?page=${page}&size=${size}`);

    if (response) yield put(createAction(ORDERS_RESPONSE, response));
    else throw new Error();
  } catch (error) {
    console.log(error);
  }
}

function* watchCustomerOrdersRequest() {
  yield takeLatest(ORDERS_REQUEST, getAllOrders);
}

function* updateOrderStatus(action) {
  const { previousStatus, ...data } = action.payload;
  try {
    const response = yield call(callApi, 'PATCH', `/api/orders`, data);

    if (!response || !response.success) throw new Error();
  } catch (error) {
    yield put(createAction(ORDER_UPDATE_STATUS_ERROR, action.payload));
  }
}

function* watchUpdateOrderStatus() {
  yield takeLatest(ORDER_UPDATE_STATUS_REQUEST, updateOrderStatus);
}

const initOrder = { genres: [], isWaitingOrders: false };
const orderActionHandlers = {
  [ORDERS_REQUEST]: state => ({ ...state, isWaitingOrders: true }),
  [ORDERS_RESPONSE]: (state, action) => {
    const { orders, total } = action.payload;
    const ordersData = orders.map(order => ({
      ...order,
      orderTotal: order.cart.reduce(
        (acc, { bookId, quantity }) => acc + Number(bookId?.price) * Number(quantity),
        0,
      ),
      customer: {
        ...order.customer.customerInfo,
        address: order.customer.address,
        phoneNumber: order.customer.phoneNumber,
      },
    }));
    return { ...state, orders: ordersData, total, isWaitingOrders: false };
  },
  [ORDER_UPDATE_STATUS_REQUEST]: (state, action) => ({
    ...state,
    orders: state.orders.map(order =>
      order._id === action.payload.id ? { ...order, status: action.payload.status } : order,
    ),
  }),
  [ORDER_UPDATE_STATUS_ERROR]: (state, action) => ({
    ...state,
    orders: state.orders.map(order =>
      order._id === action.payload.id ? { ...order, status: action.payload.previousStatus } : order,
    ),
  }),
};

export const orderReducer = createReducer(initOrder, orderActionHandlers);
export const orderSagas = [fork(watchCustomerOrdersRequest), fork(watchUpdateOrderStatus)];
