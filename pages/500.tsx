import Link from 'next/link'

export default function Custom500() {
  return (
    <>
      <h2 className='font-semibold text-3xl text-center text-neutral-100 mt-16'>
        Oops, there was an error
      </h2>
      <Link
        href='/'
        className='px-4 py-2 border border-neutral-200 bg-purple-700 hover:bg-purple-600 transition rounded-full mx-auto block w-fit mt-16'
      >
        Go back to Home
      </Link>
    </>
  )
}
