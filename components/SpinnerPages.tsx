export const SpinnerPages = () => {
  return (
    <div className='flex justify-center overflow-hidden mt-6 animate-spin-slow text-gray-300/30'>
      <div role='status'>
        <svg
          width='100'
          height='100'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m19.729 3.875.05.16.552 1.922a.75.75 0 0 1-.418.893l-.096.034L9.09 9.96h11.159a.75.75 0 0 1 .743.649l.007.101v8.498a2.75 2.75 0 0 1-2.583 2.745l-.167.005H5.75a2.75 2.75 0 0 1-2.745-2.582L3 19.208v-8.391l-.522-1.822a2.75 2.75 0 0 1 1.726-3.35l.16-.051 12.014-3.445a2.75 2.75 0 0 1 3.35 1.726ZM6.273 6.607l-1.496.429a1.25 1.25 0 0 0-.886 1.421l.029.125.344 1.2.295-.084 1.714-3.091Zm4.756-1.364-2.717.78-1.714 3.09 2.718-.779 1.713-3.09Zm4.757-1.364-2.717.78-1.714 3.09 2.717-.779 1.714-3.091Zm1.847-.234-1.52 2.74 2.568-.736-.343-1.201a1.247 1.247 0 0 0-.705-.803Z'
            fill='currentColor'
            fillRule='nonzero'
          />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
