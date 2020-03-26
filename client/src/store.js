import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { genreReducer, genreSagas } from 'components/dashboard/Genres/ducks';

const rootReducer = combineReducers({
  genre: genreReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([...genreSagas]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
