import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { preferenceReducer, preferenceSagas } from 'ducks';

const rootReducer = combineReducers({
  preference: preferenceReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([...preferenceSagas]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
