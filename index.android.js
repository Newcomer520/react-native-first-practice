/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'
// import 'babel-polyfill'
import 'es6-symbol/implement'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	Image,
	ListView,	
	View,
	ProgressBarAndroid as ProgressBar
} from 'react-native'

import { fetchMovies } from './redux/actions/movies'
import getStore from './redux/create-store'
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'

const MOCKED_MOVIES_DATA = [
  { title: 'Title', year: '2015', posters: { thumbnail: 'http://i.imgur.com/UePbdph.jpg' } },
]

@connect(
	state => ({ status: state.get('status'), movies: state.get('movies') }),
	dispatch => ({ actions: bindActionCreators({ fetchMovies }, dispatch) })
)
class AwesomeProject extends Component {
	componentDidMount() {
		const { actions: { fetchMovies } } = this.props
		fetchMovies()
	}
	renderLoadingView() {
    return (
      <View style={styles.container}>
        <ProgressBar styleAttr="Inverse" indeterminate={true} />
      </View>
    )
  }
  renderMovie(movie) {
		return (
			<View style={styles.container}>
				<Image
				source={{uri: movie.posters.thumbnail}}
				style={styles.thumbnail}
				/>
				<View style={styles.rightContainer}>
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.year}>{movie.year}</Text>
				</View>
			</View>
		)
	}
	render() {
		// const movie = MOCKED_MOVIES_DATA[0]
		return this.props.status !== 'MOVIE_REQUEST_SUCCESS'? this.renderLoadingView():
		(
			<ListView dataSource={this.props.movies} renderRow={this.renderMovie} style={styles.listView} />
		)
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


const store = getStore()
class Root extends Component{
	render() {
		return (
			<Provider store={store}>
				<AwesomeProject />
			</Provider>
		)
	}
}
// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent('AwesomeProject', () => Root);
