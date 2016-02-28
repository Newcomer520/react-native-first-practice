import { TYPES } from '../actions/movies'
import Immutable, { List } from 'immutable'
import { ListView } from 'react-native'

const { MOVIE_REQUEST, MOVIE_REQUESTING, MOVIE_REQUEST_SUCCESS, MOVIE_REQUEST_FAILED} = TYPES

const initState = Immutable.fromJS({ 
	status: null, 
	movies: new ListView.DataSource({
		rowHasChanged: (row1, row2) => row1 !== row2,
	})
})

export default function(state = initState, action) {
	switch (action.type) {
		case MOVIE_REQUESTING:
			return state.set('status', action.type)
			
		case MOVIE_REQUEST_SUCCESS:
			const movies = state.get('movies').cloneWithRows(action.movies)
			return state.set('movies', movies).set('status', action.type)//.set('movies', List.of(...action.movies))			
		case MOVIE_REQUEST_FAILED:
			return state.set('status', action.type)		
	}
	return state
}