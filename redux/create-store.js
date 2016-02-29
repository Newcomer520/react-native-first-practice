import moviesSaga from './sagas/movies'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { statusReducer as status, movieReducer as movies } from './reducers/index'

export default function getStore() {
	const sagaMiddleware = createSagaMiddleware(moviesSaga)
	const store = createStore(combineReducers({ status, movies }), applyMiddleware(sagaMiddleware))
	return store
}