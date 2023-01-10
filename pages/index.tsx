import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_KEY,
  getMovies,
  getTvShowOnAir,
  getTvShowPopular,
  getTvShowTopRated,
} from '../api'
import { DetailTVListSlider } from '../components/DetailTVListSlider'
import { HomeListSlider } from '../components/HomeListSlider'
import { MovieListResult, TvShowsListResult } from '../types'

const endPointPopular = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointTrending = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointUpcoming = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`

export async function getStaticProps() {
  const moviesPopular = await getMovies(endPointPopular)
  const moviesTrending = await getMovies(endPointTrending)
  const moviesUpcoming = await getMovies(endPointUpcoming)
  const tvShowPopular = await getTvShowPopular()
  const tvShowOnAir = await getTvShowOnAir()
  const tvShowTopRated = await getTvShowTopRated()

  return {
    props: {
      moviesPopular,
      moviesTrending,
      moviesUpcoming,
      tvShowPopular,
      tvShowOnAir,
      tvShowTopRated,
    },
  }
}

interface Props {
  moviesPopular: MovieListResult[]
  moviesTrending: MovieListResult[]
  moviesUpcoming: MovieListResult[]
  tvShowPopular: TvShowsListResult[]
  tvShowOnAir: TvShowsListResult[]
  tvShowTopRated: TvShowsListResult[]
}

export default function Home({
  moviesPopular,
  moviesTrending,
  moviesUpcoming,
  tvShowPopular,
  tvShowOnAir,
  tvShowTopRated,
}: Props) {
  return (
    <>
      <section className='py-16'>
        <h2 className='text-5xl font-semibold text-center mb-8'>Movies</h2>
        <div>
          <HomeListSlider
            title='Popular movies'
            items={moviesPopular}
            route='popular'
          />
          <HomeListSlider
            title='Upcoming movies'
            items={moviesUpcoming}
            route='upcoming'
          />
          <HomeListSlider
            title='Trending movies'
            items={moviesTrending}
            route='trending'
          />
        </div>
      </section>
      <section className=''>
        <h2 className='text-5xl font-semibold text-center mb-8'>Tv Shows</h2>
        <DetailTVListSlider items={tvShowPopular} title='Popular Tv Shows' />
        <DetailTVListSlider items={tvShowOnAir} title='On Air Tv Shows' />
        <DetailTVListSlider items={tvShowTopRated} title='Top Rated Tv Shows' />
      </section>
    </>
  )
}
