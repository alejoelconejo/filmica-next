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

export interface MovieList {
  page: number
  results: PopularMoviesResultResult[]
  total_results: number
  total_pages: number
  dates?: MovieDates
}

export interface MovieDates {
  maximum: string
  minimum: string
}
