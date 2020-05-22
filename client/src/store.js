import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { genreReducer, genreSagas } from 'components/dashboard/Genres/ducks';
import { bookReducer, bookSagas } from 'components/dashboard/Books/ducks';
import { cartReducer, cartSagas } from 'components/storefront/Cart/ducks';
import { customerReducer, customerSagas } from 'components/storefront/Customer/ducks';
import { orderReducer, orderSagas } from 'components/dashboard/Orders/ducks';
import { employeeReducer, employeeSagas } from 'components/dashboard/Employees/ducks';
import { statisticsSagas, statisticsReducer } from 'components/dashboard/Statistics/ducks';

const rootReducer = combineReducers({
  genre: genreReducer,
  book: bookReducer,
  cart: cartReducer,
  customer: customerReducer,
  order: orderReducer,
  statistics: statisticsReducer,
  employee: employeeReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([
    ...genreSagas,
    ...bookSagas,
    ...customerSagas,
    ...cartSagas,
    ...orderSagas,
    ...statisticsSagas,
    ...employeeSagas,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
