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

export type Episode = {
  title: string;
  number: number;
};

export type Show = Movie & {
  episodes: Episode[];
};

export type MovieItem = Movie | Show;

export type InitialState = {
  movies: MovieItem[];
};
