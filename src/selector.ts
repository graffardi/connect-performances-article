import { pipe } from 'fp-ts/lib/pipeable';

import { MovieItem, State } from "./entities";

export const movies = (state: State): State['movies'] => state.movies;

export const movieFromId = (movieId: MovieItem['id']) =>
  (state: State): MovieItem | undefined =>
    pipe(
      state,
      movies,
      (movies) => movies[movieId]
    );