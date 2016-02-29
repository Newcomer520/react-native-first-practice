import { TYPES } from '../actions/movies'
import Immutable, { List, Map } from 'immutable'
import { ListView } from 'react-native'

const { MOVIE_REQUEST, MOVIE_REQUESTING, MOVIE_REQUEST_SUCCESS, MOVIE_REQUEST_FAILED} = TYPES

const initStatus = null
const initMovies = new List()

export function statusReducer(state = initStatus, action) {
	switch (action.type) {
		case MOVIE_REQUESTING:
		case MOVIE_REQUEST_SUCCESS:
		case MOVIE_REQUEST_FAILED:
			return action.type
	}
	return state
}

export function movieReducer(state = initMovies, action) {
	switch (action.type) {
		case MOVIE_REQUEST_SUCCESS:
			state = List.of(...action.movies)
	}
	return state
}
