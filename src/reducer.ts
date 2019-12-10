import { State, Movie } from "./entities";
import { UPVOTE_MOVIE, DOWNVOTE_MOVIE, MovieAction } from "./actions";
import { pipe } from "fp-ts/lib/pipeable";
import { movieFromId } from "./selector";

const initialState = {
  movies: {}
};

const handleUpvotes = (
  movieId: Movie['id'],
  modifierFunction: (upvotes: number) => number) =>
  (state: State) => {
    const movie = pipe(
      state,
      movieFromId(movieId)
    );

    if (movie) {
      return {
        movies: {
          ...state.movies,
          [movieId]: {
            ...movie,
            upvotes: modifierFunction(movie.upvotes),
          },
        },
      };
    }

    return state;  
}

const initialReducer = (
  state: State = initialState,
  action: MovieAction
): State => {
  switch (action.type) {
    case UPVOTE_MOVIE: {
      const {
        payload: { movieId }
      } = action;

      return pipe(
        state,
        handleUpvotes(movieId, (upvotes) => upvotes + 1)
      );
    }

    case DOWNVOTE_MOVIE: {
      const {
        payload: { movieId }
      } = action;

      return pipe(
        state,
        handleUpvotes(movieId, (upvotes) => upvotes - 1)
      );
    }

    default:
      return state;
  }
};

export default initialReducer;
