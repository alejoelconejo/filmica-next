import {
  Cast,
  Crew,
  MovieDetail,
  MovieList,
  MovieListResult,
  Person,
  PersonCast,
  PersonCrew,
  TvShowDetail,
  TvShowList,
  TvShowsListResult,
} from './types'

export const API_KEY_PUBLIC = process.env.NEXT_PUBLIC_API_KEY
export const API_KEY = process.env.API_KEY
export const API_BASE_URL = 'https://api.themoviedb.org/3'
export const API_IMG_URL = 'https://image.tmdb.org/t/p/'
export const API_DEFAULT_LANGUAGE = 'en-US'

export const enum POSTER_SIZES {
  xs = 'w92',
  sm = 'w154',
  md = 'w185',
  lg = 'w342',
  xl = 'w500',
  '2xl' = 'w780',
  original = 'original',
}

export const enum PROFILE_SIZES {
  xs = 'w45',
  md = 'w185',
  xl = 'h632',
  original = 'original',
}

export async function getMovies(endpoint: string) {
  const res = await fetch(endpoint)
  const data: MovieList = await res.json()
  const movies = data.results
  return movies
}

export async function getPersonDetail(id: number) {
  const endPoint = `${API_BASE_URL}/person/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const res = await fetch(endPoint)
  const person: Person = await res.json()
  return person
}

export async function getPersonCredits(id: number) {
  const creditsEndPoint = `${API_BASE_URL}/person/${id}/credits?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const creditsRes = await fetch(creditsEndPoint)
  const dataCredits = await creditsRes.json()
  const crew: PersonCrew[] = await dataCredits.crew
  const cast: PersonCast[] = await dataCredits.cast
  return { crew, cast }
}

export async function getTVShowDetail(id: number) {
  const endPoint = `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const res = await fetch(endPoint)
  const tvShow: TvShowDetail = await res.json()
  return tvShow
}

export async function getTVShowRecommended(id: number) {
  const recommendedEndPoint = `${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const recommendedRes = await fetch(recommendedEndPoint)
  const dataTvShows = await recommendedRes.json()
  const recommendedTvShows: TvShowsListResult[] = await dataTvShows.results
  return recommendedTvShows
}

export async function getMovieDetail(id: number) {
  const endPoint = `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const res = await fetch(endPoint)
  const movie: MovieDetail = await res.json()
  return movie
}

export async function getMovieRecommended(id: number) {
  const recommendedEndPoint = `${API_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const recommendedRes = await fetch(recommendedEndPoint)
  const dataMovies = await recommendedRes.json()
  const recommendedMovies: MovieListResult[] = await dataMovies.results
  return recommendedMovies
}

export async function getMovieCredits(id: number) {
  const creditsEndPoint = `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const creditsRes = await fetch(creditsEndPoint)
  const dataCredits = await creditsRes.json()
  const crew: Crew[] = await dataCredits.crew
  const cast: Cast[] = await dataCredits.cast
  return { crew, cast }
}

export async function getTvShowPopular() {
  const tvShowPopularEndPoint = `${API_BASE_URL}/tv/popular?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const popularRes = await fetch(tvShowPopularEndPoint)
  const data: TvShowList = await popularRes.json()
  return data.results
}

export async function getTvShowOnAir() {
  const tvShowOnAirEndPoint = `${API_BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const onAirRes = await fetch(tvShowOnAirEndPoint)
  const data: TvShowList = await onAirRes.json()
  return data.results
}

export async function getTvShowTopRated() {
  const tvShowTopRatedEndPoint = `${API_BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}`
  const topRatedRes = await fetch(tvShowTopRatedEndPoint)
  const data: TvShowList = await topRatedRes.json()
  return data.results
}

// IMAGE SIZES ALLOWED FOR URLS IN TMDB API
//
//   "backdrop_sizes": [
//     "w300",
//     "w780",
//     "w1280",
//     "original"
//   ],
//   "logo_sizes": [
//     "w45",
//     "w92",
//     "w154",
//     "w185",
//     "w300",
//     "w500",
//     "original"
//   ],
//   "still_sizes": [
//     "w92",
//     "w185",
//     "w300",
//     "original"
//   ]
