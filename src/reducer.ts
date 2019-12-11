import { pipe } from "fp-ts/lib/pipeable";

import { movieFromId } from "./selector";
import { State, Movie } from "./entities";
import { UPVOTE_MOVIE, DOWNVOTE_MOVIE, MovieAction } from "./actions";

const initialState = {
  movies: {
    1: {
      id: '1',
      title: 'La Classe Américaine',
      synopsis: 'Monde de merde.',
      actors: ['3', '5', '1', '666'],
      upvotes: 1000,
    },
    2: {
      id: '2',
      title: 'There will be blood',
      synopsis: 'Globalement, du pétrole en grande quantité.',
      actors: ['2', '12', '1', '666'],
      upvotes: 42,
    },
    3: {
      id: '3',
      title: 'Requiem for a dream',
      synopsis: 'Pas simple!',
      actors: ['44', '56', '21', '666'],
      upvotes: 88,
    },
    4: {
      id: '4',
      title: 'Bienvenue chez les ch\'tis',
      synopsis: 'Il est là et on voudrait l\'oublier.',
      actors: ['23', '12', '3', '666'],
      upvotes: -66,
    },
  },
  actors: {
    1: {
      id: '1',
      firstName: 'Bob',
      lastName: 'Marley',
    },
    2: {
      id: '2',
      firstName: 'Dustin',
      lastName: 'Hoffman',
    },
    3: {
      id: '3',
      firstName: 'Dany',
      lastName: 'Boon',
    },
    5: {
      id: '5',
      firstName: 'Danny',
      lastName: 'DeVito',
    },
    666: {
      id: '666',
      firstName: 'Satan',
      lastName: '',
    },
    23: {
      id: '23',
      firstName: 'Dave',
      lastName: 'Bautista',
    },
    21: {
      id: '21',
      firstName: '21',
      lastName: 'Savage',
    },
    12: {
      id: '12',
      firstName: 'Tommy',
      lastName: 'Wiseau',
    },
  },
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
        ...state,
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
        handleUpvotes(movieId, upvotes => upvotes + 1)
      );
    }

    case DOWNVOTE_MOVIE: {
      const {
        payload: { movieId }
      } = action;

      return pipe(
        state,
        handleUpvotes(movieId, upvotes => upvotes - 1)
      );
    }

    default:
      return state;
  }
};

export default initialReducer;
