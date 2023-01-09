import { Person } from '../types'
import { getCountryFromPlace } from '../utils/getCountryFromPlace'
import getYearFromString from '../utils/getYearFromString'

interface Props {
  person: Person
}

export function DetailPersonData({ person }: Props) {
  return (
    <section className='text-sm text-neutral-300 flex flex-col gap-1 mb-1'>
      <span className='text-lg'>{person.known_for_department}</span>
      <div>
        <span>
          {person.birthday ? (
            <span>{getYearFromString(person.birthday)}</span>
          ) : (
            ''
          )}
          {person.place_of_birth ? (
            <span className='ml-1'>
              ({getCountryFromPlace(person.place_of_birth)})
            </span>
          ) : (
            ''
          )}
        </span>
        <span className='ml-1'>-</span>
        {person.deathday ? (
          <span>{getYearFromString(person.deathday)}</span>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}
