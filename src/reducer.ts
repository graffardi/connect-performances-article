import { InitialState } from "./entities";
import { UPVOTE_MOVIE, DOWNVOTE_MOVIE, MovieAction } from "./actions";

const initialState: InitialState = {
  movies: []
};

const initialReducer = (
  state: InitialState = initialState,
  action: MovieAction
): InitialState => {
  switch (action.type) {
    case UPVOTE_MOVIE: {
    }

    case DOWNVOTE_MOVIE: {
    }

    default: {
      return state;
    }
  }
};

export default initialReducer;
