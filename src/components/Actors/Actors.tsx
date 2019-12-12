import React, { useState, useEffect } from 'react';

import { Actor } from '../../entities';

type Props = {
  actors: Actor[];
};

const Actors = ({ actors }: Props) => {
  const [index, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [actors])

  const isFirst = index === 0;
  const isLast = index === actors.length - 1;

  return (
        <div className="actors">
          {actors[index] && <p className="actorName">
            {`${actors[index].firstName} ${actors[index].lastName}`}
          </p>}

          <div className="buttonsContainer">
            <div>
              {!isFirst &&
                <button
                  onClick={() => setCurrentIndex(index - 1)}
                >
                  Previous
                </button>
              }
            </div>

            <div>
              {!isLast && 
                <button
                  onClick={() => setCurrentIndex(index + 1)}
                >
                  Next
                </button>
              }
            </div>

          </div>
        </div>
      );
};

export default Actors;
