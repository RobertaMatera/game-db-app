export interface Game {
  name: string;
  released: string;
  background_image: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshots>;
  trailers: Array<Trailer>;
}


// this is an export for the API response
// <T> is a dynamic type so whatever type the response receives, it will return an array of that type
export interface APIResponse<T> {
  results: Array<T>
}


interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
  }
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshots {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  }
}

