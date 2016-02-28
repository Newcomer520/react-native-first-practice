import moviesSaga from './sagas/movies'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers/index'

export default function getStore() {
	const sagaMiddleware = createSagaMiddleware(moviesSaga)
	const store = createStore(reducer, applyMiddleware(sagaMiddleware))
	return store
}