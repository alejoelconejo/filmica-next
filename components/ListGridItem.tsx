import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL } from '../api'

export const ListGridItem = ({ item }: any) => {
  return (
    <li className='rounded-lg shadow-md bg-gray-800 border-gray-700 overflow-hidden grid content-center'>
      <Link href={`/movie/${item.id}`} className='w-full'>
        {item.poster_path ? (
          <Image
            src={`${API_IMG_URL}${item.poster_path}`}
            alt={item.title}
            title={item.title}
            width={384}
            height={576}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        ) : (
          <p className='line-clamp-3 m-0 md:m-2 text-center max-w-full'>
            {item.title}
          </p>
        )}
      </Link>
    </li>
  )
}
