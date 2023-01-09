import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, POSTER_SIZES } from '../api'

export const ListGridItem = ({ item }: any) => {
  return (
    <li className='aspect-[384/576] rounded-lg shadow-md bg-gray-800 border-gray-700 overflow-hidden flex items-stretch hover:brightness-125 transition'>
      <Link
        className='flex items-center justify-center flex-1'
        href={`/movie/${item.id}`}
      >
        {item.poster_path ? (
          <Image
            className='object-cover h-full'
            src={`${API_IMG_URL}${POSTER_SIZES.sm}${item.poster_path}`}
            alt={item.title}
            title={item.title}
            width={384}
            height={576}
          />
        ) : (
          <p className='line-clamp-3 text-center max-w-full text-xs md:text-sm break-all md:m-2'>
            {item.title}
          </p>
        )}
      </Link>
    </li>
  )
}
