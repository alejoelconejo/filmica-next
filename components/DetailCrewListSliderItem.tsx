import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { Crew } from '../types'

interface Props {
  person: Crew
}

export const DetailCrewListSliderItem = ({ person }: Props) => {
  return (
    <li className='min-w-0 flex-shrink-0 flex-grow-0 basis-1/4 sm:basis-1/6 md:basis-1/12'>
      <Link href={`/person/${person.id}`}>
        <div>
          {person.profile_path ? (
            <Image
              className='rounded-lg h-full object-cover'
              src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
              alt={person.name}
              width={80}
              height={120}
            />
          ) : (
            <p className='line-clamp-3 text-center max-w-full text-xs md:text-sm break-word md:m-2 h-[120px]'>
              {person.name}
            </p>
          )}
          <p className='text-sm text-center'>{person.name}</p>
          <p className='text-sm text-center text-neutral-400 line-clamp-2'>
            {person.department}
          </p>
        </div>
      </Link>
    </li>
  )
}
