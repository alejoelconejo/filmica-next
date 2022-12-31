import { API_BASE_URL, API_DEFAULT_LANGUAGE, API_KEY, getMovies } from '../api'
import { HomeListSlider } from '../components/HomeListSlider'
import { MovieListResult } from '../types'

const endPointPopular = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointTrending = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointUpcoming = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`

export async function getStaticProps() {
  const moviesPopular = await getMovies(endPointPopular)
  const moviesTrending = await getMovies(endPointTrending)
  const moviesUpcoming = await getMovies(endPointUpcoming)

  return {
    props: {
      moviesPopular,
      moviesTrending,
      moviesUpcoming,
    },
  }
}

interface Props {
  moviesPopular: MovieListResult[]
  moviesTrending: MovieListResult[]
  moviesUpcoming: MovieListResult[]
}

export default function Home({
  moviesPopular,
  moviesTrending,
  moviesUpcoming,
}: Props) {
  return (
    <>
      <h2 className='text-5xl font-bold text-center mb-8'>Filmica</h2>
      <HomeListSlider
        title='Popular films'
        items={moviesPopular}
        route='popular'
      />
      <HomeListSlider
        title='Upcoming films'
        items={moviesUpcoming}
        route='upcoming'
      />
      <HomeListSlider
        title='Trending films'
        items={moviesTrending}
        route='trending'
      />
    </>
  )
}
