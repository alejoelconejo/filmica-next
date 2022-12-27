export const ListGrid = ({ children }: any) => {
  return (
    <ul className='grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-2 md:gap-4'>
      {children}
    </ul>
  )
}
