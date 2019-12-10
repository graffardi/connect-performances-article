import React, { useState } from 'react';

const MovieList = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <div className="currentMovie">
      {currentId}

      <div className="buttonsContainer">
        <button onClick={() => setCurrentId(currentId - 1)}>Previous</button>
        <button onClick={() => setCurrentId(currentId + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;