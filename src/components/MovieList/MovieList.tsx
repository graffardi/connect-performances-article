import React, { useState } from 'react';

import Movie from '../Movie/MovieContainer';

const MovieList = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <div className="currentMovie">
      {currentId}

      <Movie movieId={`${currentId}`} />

      <div className="buttonsContainer">
        <button onClick={() => setCurrentId(currentId - 1)}>Previous</button>
        <button onClick={() => setCurrentId(currentId + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;