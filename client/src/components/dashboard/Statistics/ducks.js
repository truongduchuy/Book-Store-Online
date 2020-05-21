import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const BEST_SELLER_REQUEST = 'BEST_SELLER_REQUEST';
export const BEST_SELLER_RESPONSE = 'BEST_SELLER_RESPONSE';

function* requestBestSeller(action) {
  try {
    const { genreId, startDate, endDate } = action.payload;

    const response = yield call(
      callApi,
      'GET',
      `/api/orders/statistics?startDate=${startDate}&endDate=${endDate}&genreId=${genreId}`,
    );

    if (response) yield put(createAction(BEST_SELLER_RESPONSE, response));
  } catch (error) {
    console.log(error);
  }
}

function* watchBestSellerRequest() {
  yield takeLatest(BEST_SELLER_REQUEST, requestBestSeller);
}

const initStatistics = { isWaitingData: false, books: [] };
const statisticsActionHandlers = {
  [BEST_SELLER_REQUEST]: (state, action) => ({ ...state, isWaitingData: true }),
  [BEST_SELLER_RESPONSE]: (state, action) => ({
    ...state,
    isWaitingData: false,
    books: action.payload,
  }),
};

export const statisticsReducer = createReducer(initStatistics, statisticsActionHandlers);
export const statisticsSagas = [fork(watchBestSellerRequest)];
