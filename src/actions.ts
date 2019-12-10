import { MovieItem } from "./entities";

export type MovieActionTypes = "UPVOTE_MOVIE" | "DOWNVOTE_MOVIE";

export type MovieAction = {
  type: MovieActionTypes;
  payload: {
    movieId: MovieItem["id"]
  };
};

export const UPVOTE_MOVIE = "UPVOTE_MOVIE";
export const DOWNVOTE_MOVIE = "DOWNVOTE_MOVIE";

export const upvoteMovie = (movieId: MovieItem["id"]): MovieAction => ({
  type: UPVOTE_MOVIE,
  payload: { movieId },
});

export const downvoteMovie = (movieId: MovieItem["id"]): MovieAction => ({
  type: DOWNVOTE_MOVIE,
  payload: { movieId },
});
