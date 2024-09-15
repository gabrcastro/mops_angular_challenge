export interface CharacterResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: null;
  };
  results: CharacterData[];
}

export interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;

  isFavorited: boolean;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}
