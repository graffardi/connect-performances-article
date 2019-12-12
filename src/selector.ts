import { pipe } from 'fp-ts/lib/pipeable';
import { map, filter } from 'fp-ts/lib/Array';
import { fromNullable, Option, map as mapOption } from 'fp-ts/lib/Option';

import { Movie, State, Actor } from "./entities";

export const movies = (state: State): State['movies'] => state.movies;

export const movieFromId = (movieId: Movie['id']) =>
  (state: State): Movie | undefined =>
    pipe(
      state,
      movies,
      (movies) => movies[movieId]
    );

export const actors = (state: State): State['actors'] => state.actors;

export const actorFromId = (actorId: Actor['id']) =>
  (state: State): Actor | undefined =>
    pipe(
      state,
      actors,
      actors => actors[actorId]
    );

const isActor = (t: Actor | undefined): t is Actor => !(t === undefined);

export const actorsFromMovieId = (movieId: Movie['id']) =>
  (state: State): Option<Actor[]> =>
    pipe(
      state,
      movies,
      moviesList => moviesList[movieId],
      fromNullable,
      mapOption(
        movie => pipe(
          movie.actors,
          map(
            actorId => pipe(
              state,
              actorFromId(actorId)
            )
          ),
          filter(isActor),
        )
      )
    );
