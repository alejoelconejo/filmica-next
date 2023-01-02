import { MovieList } from './types'

export const API_KEY_PUBLIC = process.env.NEXT_PUBLIC_API_KEY
export const API_KEY = process.env.API_KEY
export const API_BASE_URL = 'https://api.themoviedb.org/3'
export const API_IMG_URL = 'https://image.tmdb.org/t/p/w342'
export const API_DEFAULT_LANGUAGE = 'en-US'

export const getMovies = async (endpoint: string) => {
  const res = await fetch(endpoint)
  const data: MovieList = await res.json()
  const movies = data.results
  return movies
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
//   "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
//   ],
//   "profile_sizes": [
//     "w45",
//     "w185",
//     "h632",
//     "original"
//   ],
//   "still_sizes": [
//     "w92",
//     "w185",
//     "w300",
//     "original"
//   ]
