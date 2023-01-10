import { ReactNode, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

interface Props {
  children: ReactNode
  options: EmblaOptionsType
}

export const ListSlider = ({ children, options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <div className='overflow-hidden relative'>
      <div className='absolute right-0 top-0 w-8 bg-gradient-to-r from-transparent to-black h-full z-10'></div>
      <div ref={emblaRef}>
        <ul className='flex gap-2 mr-4'>{children}</ul>
      </div>
      {prevBtnEnabled && (
        <button
          type='button'
          className='absolute top-0 left-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          onClick={scrollPrev}
        >
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 group-hover:bg-gray-800/80 group-focus:ring-2 group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg
              aria-hidden='true'
              className='w-6 h-6 text-gray-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              ></path>
            </svg>
            <span className='sr-only'>Previous</span>
          </span>
        </button>
      )}
      {nextBtnEnabled && (
        <button
          type='button'
          className='absolute top-0 right-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
          onClick={scrollNext}
        >
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 group-hover:bg-gray-800/80 group-focus:ring-2 group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg
              aria-hidden='true'
              className='w-6 h-6 text-gray-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
            <span className='sr-only'>Next</span>
          </span>
        </button>
      )}
    </div>
  )
}
