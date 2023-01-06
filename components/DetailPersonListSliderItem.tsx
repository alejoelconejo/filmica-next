import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { Cast, Crew } from '../types'

interface Props {
  person: Crew | Cast
}

export const DetailPersonListSliderItem = ({ person }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 sm:basis-1/6 md:basis-1/12'>
      <Link href={`/people/${person.id}`}>
        {person.profile_path ? (
          <div>
            <Image
              className='rounded-lg h-full object-cover'
              src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
              alt={person.name}
              width={80}
              height={120}
            />
            <p className='text-sm text-center'>{person.name}</p>
            <p className='text-sm text-center text-neutral-400'>
              {person.known_for_department}
            </p>
          </div>
        ) : (
          <p className='line-clamp-3 text-center max-w-full text-xs md:text-sm break-word md:m-2'>
            {person.name}
          </p>
        )}
      </Link>
    </li>
  )
}
