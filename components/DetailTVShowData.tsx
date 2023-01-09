import { TvShowDetail } from '../types'
import getYearFromString from '../utils/getYearFromString'
import roundNumOneDecimal from '../utils/roundNumOneDecimal'

interface Props {
  tvShow: TvShowDetail
}

export function DetailTVShowData({ tvShow }: Props) {
  return (
    <section>
      <section className='text-sm text-neutral-300 flex gap-1 mb-1'>
        {tvShow.first_air_date ? (
          <span>
            {getYearFromString(tvShow.first_air_date)}
            <span className='ml-1'>-</span>
            {tvShow.last_air_date ? (
              <span className='ml-1'>
                {getYearFromString(tvShow.last_air_date)}
              </span>
            ) : (
              ''
            )}
            <span className='text-neutral-400 ml-1'>•</span>
          </span>
        ) : (
          ''
        )}
        {tvShow.episode_run_time ? (
          <span>
            {tvShow.episode_run_time} min.
            <span className='text-neutral-400 ml-1'>•</span>
          </span>
        ) : (
          ''
        )}
        {tvShow.origin_country ? <span>{tvShow.origin_country}</span> : ''}
      </section>
      {tvShow.vote_count ? (
        <p className='text-sm text-neutral-300'>
          <span className='mr-[0.15rem] text-yellow-400'>★</span>
          {roundNumOneDecimal(tvShow.vote_average)}
          <span className='text-xs ml-1'>({tvShow.vote_count})</span>
        </p>
      ) : (
        ''
      )}
      <p className='text-sm text-neutral-300 flex gap-2 mt-1'>
        <span>Seasons: {tvShow.number_of_seasons}</span>
        <span>Episodes: {tvShow.number_of_episodes}</span>
      </p>
    </section>
  )
}
