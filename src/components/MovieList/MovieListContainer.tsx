import { connect } from 'react-redux';

import { State } from '../../entities';

import { movies } from '../../selector';

import MovieList from './MovieList';

const mapStateToProps = (state: State) => {
  const moviesList = movies(state);

  return {
    movies: moviesList,
  };
};

export default connect(mapStateToProps, null)(MovieList);
