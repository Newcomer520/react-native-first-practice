import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { TYPES } from '../actions/movies'
import Timer from 'react-timer-mixin'

const { MOVIE_REQUEST, MOVIE_REQUESTING, MOVIE_REQUEST_SUCCESS, MOVIE_REQUEST_FAILED} = TYPES
const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'


function delay(ms) {
  return new Promise(resolve => {
  	const timer = Timer.setTimeout(() => {  		
  		Timer.clearTimeout(timer)
  		resolve()
  	}, ms)
  })
}

function moviesApi() {
	return fetch(REQUEST_URL)
    .then(response => response.json())
    .then(json => json.movies)
}

function* fetchMovies() {
	try {
		yield put({ type: MOVIE_REQUESTING })
		yield call(delay, 3000)
		const movies = yield call(moviesApi)
		yield put({ type: MOVIE_REQUEST_SUCCESS, movies: movies })
	}	catch(ex) {
		yield put({ type: MOVIE_REQUEST_FAILED, message: ex.message })
	}
}

export default function* movieSaga() {
	yield* takeLatest(MOVIE_REQUEST, fetchMovies)
}