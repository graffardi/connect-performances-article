import { connect } from 'react-redux';

import { pipe } from 'fp-ts/lib/pipeable';
import { fromOption, mapLeft, map as mapRight } from 'fp-ts/lib/Either';
import { Option, fromNullable, map as mapOption } from 'fp-ts/lib/Option';

import { State, Movie as MovieType, Actor } from '../../entities';
import { movieFromId, actorsFromMovieId } from '../../selector';
import { upvoteMovie, downvoteMovie } from '../../actions';

import eitherComponent, { EitherComponentProps } from '../eitherComponent';

import Movie from './Movie';

// Types

type ExternalProps = {
  movieId: MovieType['id'];
};

type StateProps = Option<{
  movie: MovieType;
  actors: Option<Actor[]>;
}>;

type DispatchProps = {
  upvoteMovie: (movieId: MovieType['id']) => void;
  downvoteMovie: (movieId: MovieType['id']) => void;
};

// EitherComponent - Setup

const FallbackComponent = () => null;
const EitherMovie = eitherComponent(FallbackComponent, Movie);

type MergedProps = EitherComponentProps<
  typeof FallbackComponent,
  typeof Movie
>;

// Connect

const mapStateToProps = (
  state: State,
  { movieId }: ExternalProps
): StateProps =>
  pipe(
    state,
    movieFromId(movieId),
    fromNullable,
    mapOption(movie =>
      ({
        movie,
        actors: pipe(
          state,
          actorsFromMovieId(movie.id)
        )
      })
    )
  );

const mapDispatchToProps = {
  upvoteMovie,
  downvoteMovie,
};

const mergeProps = (
  maybeStateProps: StateProps,
  { upvoteMovie, downvoteMovie }: DispatchProps,
  { movieId }: ExternalProps
): MergedProps => {
  const eitherProps = pipe(
    maybeStateProps,
    fromOption(
      () => new Error('Unknow movieId'),
    ),
    mapLeft(error => {
      console.error(error);
    }),
    mapRight(stateProps => {
      const { movie, actors } = stateProps;

      return {
        movie,
        actors,
        upvoteMovie: () => {
          upvoteMovie(movieId);
        },
        downvoteMovie: () => {
          downvoteMovie(movieId);
        }
      };
    })
  );

  return { eitherProps };
}

const ConnectedEitherMovie = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EitherMovie);

export default ConnectedEitherMovie;
