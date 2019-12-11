import React, { useState, useEffect } from 'react';

import { Actor } from '../../entities';

type ActorButton = "previous" | "next";

type Props = {
  actors: Actor[];
};

const Actors = ({ actors }: Props) => {
  const [index, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [actors])

  const handleClick = (buttonType: ActorButton) => {
    switch (buttonType) {
      case 'next': {
        if ((index + 1) < actors.length) {
          setCurrentIndex(index + 1);
        }

        break;
      }

      case 'previous': {
        if (index > 0) {
          setCurrentIndex(index - 1);
        }

        break;
      }

      default:
        return null;
    }
  };

  return (
    <div className="actors">
      {actors[index] && <p className="actorName">
        {`${actors[index].firstName} ${actors[index].lastName}`}
      </p>}

      <div className="buttonsContainer">
      <button onClick={() => handleClick('previous')}>Previous</button>
        <button onClick={() => handleClick('next')}>Next</button>
      </div>
    </div>
  );
};

export default Actors;
