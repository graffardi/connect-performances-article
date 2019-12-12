import React, { useState, useEffect } from 'react';

import { pipe } from 'fp-ts/lib/pipeable';
import { Option, fold } from 'fp-ts/lib/Option';

import { Actor } from '../../entities';

type Props = {
  actors: Option<Actor[]>;
};

const Actors = ({ actors }: Props) => {
  const [index, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [actors])

  const isFirst = index === 0;
  const isLast = (length: number) => index === length - 1;

  return pipe(
    actors,
    fold(
      () => null,
      actors => (
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
              {!isLast(actors.length) && 
                <button
                  onClick={() => setCurrentIndex(index + 1)}
                >
                  Next
                </button>
              }
            </div>

          </div>
        </div>
      )
    )
  );
};

export default Actors;
