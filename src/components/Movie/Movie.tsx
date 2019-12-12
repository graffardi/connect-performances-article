import React from 'react';

import { Option } from 'fp-ts/lib/Option';

import { Actor, Movie as MovieType } from "../../entities";

import Actors from '../Actors/Actors';

type Props = {
  movie: MovieType,
  actors: Option<Actor[]>,
  upvoteMovie: () => void;
  downvoteMovie: () => void;
};

const Movie = ({
  movie,
  actors,
  upvoteMovie,
  downvoteMovie,
}: Props) => (
  <div className="movie">
    <h4 className="movieTitle">
      {`${movie.title} - ${movie.upvotes}`}
    </h4>

    <div className="buttonsContainer">
        <button onClick={upvoteMovie}>Good</button>
        <button onClick={downvoteMovie}>Bad</button>
    </div>

    <Actors actors={actors} />
  </div>
);

export default Movie;
