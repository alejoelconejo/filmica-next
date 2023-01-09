import Image from 'next/image'
import { API_IMG_URL, POSTER_SIZES } from '../api'

interface Props {
  title: string
  posterPath: string
}

export function DetailMovieTVImage({ title, posterPath }: Props) {
  return posterPath ? (
    <div>
      <Image
        src={`${API_IMG_URL}${POSTER_SIZES.lg}${posterPath}`}
        className='mx-auto rounded border-2 border-orange-400/20'
        alt={title}
        height={384}
        width={256}
      />
    </div>
  ) : (
    <div className='h-[384px] mx-auto aspect-[256/384] object-cover border-2 rounded border-green-400/20 bg-neutral-900 flex items-center justify-center'>
      <p className='line-clamp-2 max-w-full font-semibold text-2xl break-all'>
        {title}
      </p>
    </div>
  )
}
