export interface MovieListResult {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TvShowsListResult {
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  original_language: string
  original_name: string
  overview: string
  origin_country: string[]
  poster_path: string
  popularity: number
  name: string
  vote_average: number
  vote_count: number
}

export interface PersonListResult {
  profile_path: string
  adult: boolean
  id: number
  known_for: MovieListResult[] & TvShowsListResult[]
  name: string
  popularity: number
}

export interface SearchResult {
  id: number
  poster_path?: string
  adult?: boolean
  overview?: string
  release_date?: string
  genre_ids?: number[]
  original_title?: string
  original_language?: string
  title?: string
  backdrop_path?: string
  popularity: number
  vote_count?: number
  vote_average?: number
  video?: boolean
  name?: string
  first_air_date?: string
  original_name?: string
  origin_country?: string[]
  profile_path?: string
  known_for?: MovieListResult[] & TvShowsListResult[]
  media_type: string
}

export interface SearchList {
  page: number
  results: SearchResult[]
  total_results: number
  total_pages: number
  dates?: MovieDates
}

export interface MovieList {
  page: number
  results: MovieListResult[]
  total_results: number
  total_pages: number
  dates?: MovieDates
}

export interface TvShowList {
  page: number
  results: TvShowsListResult[]
  total_results: number
  total_pages: number
  dates?: MovieDates
}

export interface MovieDates {
  maximum: string
  minimum: string
}

export interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: any
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Person {
  birthday: string
  known_for_department: string
  deathday?: string
  id: number
  name: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  place_of_birth: string
  profile_path: string
  adult: boolean
  imdb_id: string
  homepage?: string
}

export interface PersonCast {
  character: string
  credit_id: string
  release_date: string
  vote_count: number
  video: boolean
  adult: boolean
  vote_average: number
  title: string
  genre_ids: number[]
  original_language: string
  original_title: string
  popularity: number
  id: number
  backdrop_path: string
  overview: string
  poster_path: string
}

export interface PersonCrew {
  id: number
  department: string
  original_language: string
  original_title: string
  job: string
  overview: string
  vote_count: number
  video: boolean
  poster_path: string
  backdrop_path: string
  title: string
  popularity: number
  genre_ids: number[]
  vote_average: number
  adult: boolean
  release_date: string
  credit_id: string
}

export interface PersonCredits {
  cast: Cast[]
  crew: Crew[]
  id: number
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface LastEpisodeToAir {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface Network {
  name: string
  id: number
  logo_path: string
  origin_country: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface SpokenLanguage {
  english_name?: string
  iso_639_1: string
  name: string
}

export interface TvShowDetail {
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air?: any
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface UserFavorite {
  id: number
  title: string
  img: string
  type: string
  userId: string
}
