import { connect } from 'react-redux';

import { State, Movie as MovieType } from '../../entities';

import { upvoteMovie, downvoteMovie } from '../../actions';

import eitherComponent from '../eitherComponent';

import Movie from './Movie';

type ExternalProps = {
  movieId: MovieType['id'];
};

type StateProps = {
  movie: MovieType;
};

type DispatchProps = {
  upvoteMovie: () => void;
  downvoteMovie: () => void;
};

const FallbackComponent = () => null;
const EitherMovie = eitherComponent(FallbackComponent, Movie);

const mapStateToProps = (
  state: State,
  { movieId }: ExternalProps
) => {
  // Faire  descendre une movie, ownprops movieId et encapsuler actions dans mergeProps\
  // movieId peut-être faux donc on return une option dans le selecteur OU
  // fromNullable ici pour reproduire le cas habituel
  // Si présent aller get les actors, peut-être faux également
};

const mapDispatchToProps = {
  upvoteMovie,
  downvoteMovie,
};

const mergeProps = (
  state: State,
  { upvoteMovie, downvoteMovie }: DispatchProps,
  { movieId }: ExternalProps
) => {

}

const ConnectedEitherMovie = connect(mapStateToProps, mapDispatchToProps, mergeProps)(EitherMovie);

export default ConnectedEitherMovie;
