export const TYPES = {
	MOVIE_REQUEST: 'MOVIE_REQUEST',
	MOVIE_REQUESTING: 'MOVIE_REQUESTING',
	MOVIE_REQUEST_SUCCESS: 'MOVIE_REQUEST_SUCCESS',
	MOVIE_REQUEST_FAILED: 'MOVIE_REQUEST_FAILED'
}

export function fetchMovies() {
	return {
		type: TYPES.MOVIE_REQUEST
	}
}