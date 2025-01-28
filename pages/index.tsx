import {
  API_BASE_URL,
  API_DEFAULT_LANGUAGE,
  API_KEY,
  getMovies,
  getTvShowOnAir,
  getTvShowPopular,
  getTvShowTopRated,
} from '../api'
import { HeadCustom } from '../components/HeadCustom'
import { HomeLatestMovie } from '../components/HomeLatestMovie'
import { HomeListSlider } from '../components/HomeListSlider'
import { HomeTvList } from '../components/HomeTvList'
import { MovieListResult, TvShowsListResult } from '../types'

const endPointPopular = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointTrending = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`
const endPointUpcoming = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${API_DEFAULT_LANGUAGE}&page=1`

const TV_SHOW_LIST_LENGTH = 5

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
  const tvShowPopularSliced = tvShowPopular.slice(0, TV_SHOW_LIST_LENGTH)
  const tvShowOnAirSliced = tvShowOnAir.slice(0, TV_SHOW_LIST_LENGTH)
  const tvShowTopRatedSliced = tvShowTopRated.slice(0, TV_SHOW_LIST_LENGTH)

  return (
    <>
      <HeadCustom
        title='Filmica - Discover your favourite movies'
        description='Discover your favourite movies, tv shows and people'
      />
      <HomeLatestMovie movies={moviesTrending} />
      <section className='my-16'>
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
        </div>
      </section>
      <section>
        <h2 className='font-semibold text-2xl mb-4 uppercase'>TV Shows</h2>
        <div className='grid md:grid-cols-3 gap-x-8 sm:grid-cols-2 grid-cols-1'>
          <HomeTvList
            title='Popular'
            items={tvShowPopularSliced}
            route='popular-tv'
          />
          <HomeTvList
            title='On Air'
            items={tvShowOnAirSliced}
            route='on-air-tv'
          />
          <HomeTvList
            title='Top Rated'
            items={tvShowTopRatedSliced}
            route='top-rated-tv'
          />
        </div>
      </section>
    </>
  )
}
