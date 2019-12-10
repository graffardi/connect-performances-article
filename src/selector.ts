import { pipe } from 'fp-ts/lib/pipeable';

import { Movie, State } from "./entities";

export const movies = (state: State): State['movies'] => state.movies;

export const movieFromId = (movieId: Movie['id']) =>
  (state: State): Movie | undefined =>
    pipe(
      state,
      movies,
      (movies) => movies[movieId]
    );