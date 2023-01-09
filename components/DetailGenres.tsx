import { MovieDetail, TvShowDetail } from '../types'

interface Props {
  movieTV: MovieDetail | TvShowDetail
}

export function DetailGenres({ movieTV }: Props) {
  return (
    <ul className='flex flex-wrap gap-2 text-sm mb-4'>
      {movieTV.genres.map((genre) => (
        <li
          key={genre.id}
          className='border px-2 py-1 border-neutral-200 rounded-lg'
        >
          {genre.name}
        </li>
      ))}
    </ul>
  )
}
