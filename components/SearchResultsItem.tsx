import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL } from '../api'

export const SearchResultsItem = ({ result }: any) => {
  if (result.media_type === 'person')
    return (
      <li className='flex gap-4'>
        <Link href={`/person/${result.id}`}>
          <Image
            src={`${API_IMG_URL}${result.profile_path}`}
            alt={result.name}
            height={128}
            width={64}
          />
        </Link>
        <Link className='text-xl h-fit' href={`/person/${result.id}`}>
          {result.name}
        </Link>
      </li>
    )

  if (result.media_type === 'tv') {
    return (
      <li className='flex gap-4'>
        <Link href={`/tv/${result.id}`}>
          <Image
            src={`${API_IMG_URL}${result.poster_path}`}
            alt={result.original_name}
            height={128}
            width={64}
          />
        </Link>
        <Link className='text-xl h-fit' href={`/tv/${result.id}`}>
          {result.original_name}
        </Link>
      </li>
    )
  }

  return (
    <li className='flex gap-4'>
      <Link href={`/movie/${result.id}`}>
        <Image
          src={`${API_IMG_URL}${result.poster_path}`}
          alt={result.original_title}
          height={128}
          width={64}
        />
      </Link>
      <Link className='text-xl h-fit' href={`/movie/${result.id}`}>
        {result.original_title}
      </Link>
    </li>
  )
}
