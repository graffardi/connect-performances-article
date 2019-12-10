import { Movie } from "./entities";

export type MovieActionTypes = "UPVOTE_MOVIE" | "DOWNVOTE_MOVIE";

export type MovieAction = {
  type: MovieActionTypes;
  payload: {
    movieId: Movie["id"]
  };
};

export const UPVOTE_MOVIE = "UPVOTE_MOVIE";
export const DOWNVOTE_MOVIE = "DOWNVOTE_MOVIE";

export const upvoteMovie = (movieId: Movie["id"]): MovieAction => ({
  type: UPVOTE_MOVIE,
  payload: { movieId },
});

export const downvoteMovie = (movieId: Movie["id"]): MovieAction => ({
  type: DOWNVOTE_MOVIE,
  payload: { movieId },
});
