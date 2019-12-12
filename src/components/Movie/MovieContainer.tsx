import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceS } from 'fp-ts/lib/Apply';
import { fromNullable, fold, option } from 'fp-ts/lib/Option';

import { State, Movie as MovieType, Actor } from '../../entities';
import { movieFromId, actorsFromMovieId } from '../../selector';
import { upvoteMovie, downvoteMovie } from '../../actions';

import Movie from './Movie';

// Types

type ExternalProps = {
  movieId: MovieType['id'];
};

type StateProps = {
  movie: MovieType;
  actors: Actor[];
};

type DispatchProps = {
  upvoteMovie: () => void;
  downvoteMovie: () => void;
};

const createMovieActions = (
  movieId: MovieType['id'],
  dispatch: Dispatch
): DispatchProps => ({
    upvoteMovie: () => {
      dispatch(upvoteMovie(movieId));
    },
    downvoteMovie: () => {
      dispatch(downvoteMovie(movieId));
    },
  });

const movieWithActors = (movieId: MovieType['id']) => (state: State) => {
  const movie = pipe(
    state,
    movieFromId(movieId),
    fromNullable
  );
  const actors = pipe(
    state,
    actorsFromMovieId(movieId)
  );

  return sequenceS(option)({ movie, actors });
}

const EitherMovie = ({ movieId }: ExternalProps) => {
  const dispatch = useDispatch();

  const maybeMovieWithActors = useSelector(movieWithActors(movieId));

  const {
    upvoteMovie,
    downvoteMovie,
  } = createMovieActions(movieId, dispatch);

  return pipe(
    maybeMovieWithActors,
    fold(
      () => {
        console.error('Unknown movie or actors');

        return null;
      },
      ({ movie, actors }: StateProps) => (
        <Movie
          movie={movie}
          actors={actors}
          upvoteMovie={upvoteMovie}
          downvoteMovie={downvoteMovie}
        />
      )
    )
  );
};

export default EitherMovie;
