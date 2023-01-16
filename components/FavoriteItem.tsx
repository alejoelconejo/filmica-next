import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { API_IMG_URL, POSTER_SIZES, PROFILE_SIZES } from '../api'
import { useRemoveFavorite } from '../hooks/useFavorites'
import { UserFavorite } from '../types'

export function FavoriteItem({ id, img, title, type, userId }: UserFavorite) {
  const removeFavorite = useRemoveFavorite(userId)

  function handleRemoveFavorite({
    id,
    title,
    img,
    type,
    userId,
  }: UserFavorite) {
    removeFavorite.mutate({ id, title, img, type, userId })
    toast.success('Removed from your favorites!')
  }

  if (type === 'person') {
    return (
      <li className='flex gap-4 hover:brightness-125 transition relative'>
        <div>
          <Link href={`/person/${id}`}>
            <Image
              className='w-auto rounded-sm'
              alt={title}
              src={`${API_IMG_URL}${PROFILE_SIZES.md}${img}`}
              height={300}
              width={150}
              title={title}
            />

            <span className='bg-blue-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -left-1 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#fff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M0 0h24v24H0z' stroke='none' />
                <circle cx='12' cy='7' r='4' />
                <path d='M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2' />
              </svg>
            </span>
          </Link>
        </div>
        <div className='flex gap-2 absolute top-2 right-2'>
          <button
            className='text-2xl bg-neutral-400/20 p-2 rounded-full text-red-500 hover:text-neutral-400/20 transition z-50'
            aria-label='Remove from favorites'
            title='Remove from favorites'
            onClick={() =>
              handleRemoveFavorite({
                id,
                title,
                img,
                type,
                userId,
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='26'
              viewBox='0 0 24 24'
              strokeWidth='1.8'
              stroke='#ff2825'
              fill='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </svg>
          </button>
        </div>
      </li>
    )
  }

  if (type === 'tv') {
    return (
      <li className='flex gap-4 hover:brightness-125 transition relative'>
        <Link href={`/tv/${id}`}>
          <div className='relative'>
            <Image
              className='w-auto rounded-sm'
              alt={title}
              src={`${API_IMG_URL}${POSTER_SIZES.md}${img}`}
              height={300}
              width={150}
              title={title}
            />

            <span className='bg-pink-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -left-1 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#fff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M0 0h24v24H0z' stroke='none' />
                <rect x='3' y='7' width='18' height='13' rx='2' />
                <path d='m16 3-4 4-4-4' />
              </svg>
            </span>
          </div>
        </Link>
        <div className='flex gap-2 absolute top-2 right-2'>
          <button
            className='text-2xl bg-neutral-400/20 p-2 rounded-full text-red-500 hover:text-neutral-400/20 transition'
            aria-label='Remove from favorites'
            title='Remove from favorites'
            onClick={() =>
              handleRemoveFavorite({
                id,
                title,
                img,
                type,
                userId,
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='26'
              viewBox='0 0 24 24'
              strokeWidth='1.8'
              stroke='#ff2825'
              fill='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </svg>
          </button>
        </div>
      </li>
    )
  }

  // for 'movie' type
  return (
    <li className='flex gap-4 hover:brightness-125 transition relative'>
      <Link href={`/movie/${id}`}>
        <div>
          <Image
            className='w-auto rounded-sm'
            alt={title}
            src={`${API_IMG_URL}${POSTER_SIZES.md}${img}`}
            height={300}
            width={150}
            title={title}
          />

          <span className='bg-green-400 text-neutral-50 text-xs p-1 absolute -bottom-1 -left-1 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#fff'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M0 0h24v24H0z' stroke='none' />
              <rect x='4' y='4' width='16' height='16' rx='2' />
              <path d='M8 4v16M16 4v16M4 8h4M4 16h4M4 12h16M16 8h4M16 16h4' />
            </svg>
          </span>
        </div>
      </Link>
      <div className='flex gap-2 absolute top-2 right-2'>
        <button
          className='text-2xl bg-neutral-400/20 p-2 rounded-full text-red-500 hover:text-neutral-400/20 transition'
          aria-label='Remove from favorites'
          title='Remove from favorites'
          onClick={() =>
            handleRemoveFavorite({
              id,
              title,
              img,
              type,
              userId,
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            viewBox='0 0 24 24'
            strokeWidth='1.8'
            stroke='#ff2825'
            fill='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
          </svg>
        </button>
      </div>
    </li>
  )
}
