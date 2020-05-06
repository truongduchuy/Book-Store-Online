import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { genreReducer, genreSagas } from 'components/dashboard/Genres/ducks';
import { bookReducer, bookSagas } from 'components/dashboard/Books/ducks';
import { cartReducer } from 'components/storefront/Cart/ducks';
import { customerReducer, customerSagas } from 'components/storefront/Customer/ducks';

const rootReducer = combineReducers({
  genre: genreReducer,
  book: bookReducer,
  cart: cartReducer,
  customer: customerReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([...genreSagas, ...bookSagas, ...customerSagas]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
