export type Actor = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  actors: Actor["id"][];
  upvotes: number;
};

export type State = {
  movies: {
    [key: string]: Movie
  };
};
