import React from 'react';

import { Actor, Movie as MovieType } from "../../entities";

type Props = {
  movie: MovieType,
  actors: Actor[],
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
    {movie}
    {actors}
    {upvoteMovie}
    {downvoteMovie}
  </div>
);

export default Movie;
