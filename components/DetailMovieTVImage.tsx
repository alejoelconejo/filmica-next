import Image from 'next/image'
import { API_IMG_URL, POSTER_SIZES } from '../api'

interface Props {
  title: string
  posterPath: string
}

export function DetailMovieTVImage({ title, posterPath }: Props) {
  return (
    <div>
      <Image
        src={`${API_IMG_URL}${POSTER_SIZES.lg}${posterPath}`}
        className='mx-auto rounded border-2 border-orange-400/20'
        alt={title}
        height={384}
        width={256}
      />
    </div>
  )
}
