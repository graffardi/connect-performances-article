import { createSelector } from 'reselect';

import { pipe } from 'fp-ts/lib/pipeable';
import { map, filter } from 'fp-ts/lib/Array';
import { fromNullable, map as mapOption } from 'fp-ts/lib/Option';

import { Movie, State, Actor } from "./entities";

export const movies = (state: State) => state.movies;

export const movieFromId = (movieId: Movie['id']) =>
  createSelector(
    movies,
    movieList => movieList[movieId]
  );

export const actors = (state: State): State['actors'] => state.actors;

const isActor = (t: Actor | undefined): t is Actor => !(t === undefined);

export const actorsFromMovieId = (movieId: Movie['id']) =>
  createSelector(
    [movieFromId(movieId), actors],
    (movie, actors) =>
      pipe(
        movie,
        fromNullable,
        mapOption(
          movie =>
            pipe(
              movie.actors,
              map(
                actorId => actors[actorId]
              ),
              filter(isActor)
            )
        )
      )
  );
