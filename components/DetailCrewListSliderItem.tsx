import Image from 'next/image'
import Link from 'next/link'
import { API_IMG_URL, PROFILE_SIZES } from '../api'
import { Crew } from '../types'
import { getInitialsFromFullName } from '../utils/getInitialsFromName'

interface Props {
  person: Crew
}

export const DetailCrewListSliderItem = ({ person }: Props) => {
  return (
    <li className='hover:brightness-125 transition'>
      <Link className='h-full block' href={`/person/${person.id}`}>
        <div className='h-full'>
          <div className='flex flex-col items-center'>
            {person.profile_path ? (
              <div className='h-[120px] w-20'>
                <Image
                  className='rounded-lg h-full object-cover position-center border border-neutral-700'
                  src={`${API_IMG_URL}${PROFILE_SIZES.md}${person.profile_path}`}
                  alt={person.name}
                  width={80}
                  height={120}
                  title={person.name}
                />
              </div>
            ) : (
              <div className='h-[120px] w-20 flex items-center justify-center border rounded-lg border-neutral-700'>
                <p className='line-clamp-3 text-center max-w-full font-semibold text-sm break-word'>
                  {getInitialsFromFullName(person.name)}
                </p>
              </div>
            )}
            <p className='text-sm text-center'>{person.name}</p>
          </div>
          <div>
            <p className='text-sm text-center text-neutral-400 line-clamp-2'>
              {person.department}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
