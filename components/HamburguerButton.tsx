interface Props {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const HamburgerButton = ({ isMenuOpen, toggleMenu }: Props) => {
  return (
    <button className='relative group' onClick={toggleMenu}>
      <div className='relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md'>
        <div className='flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden'>
          <div
            className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 ${
              isMenuOpen && 'translate-x-0 w-12'
            } flex w-0`}
          >
            <div
              className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${
                isMenuOpen && 'rotate-45'
              }`}
            ></div>
            <div
              className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${
                isMenuOpen && '-rotate-45'
              }`}
            ></div>
          </div>
          <div
            className={`bg-white h-[2px] w-5 transform transition-all duration-300 origin-left ${
              isMenuOpen && 'translate-y-6 delay-100'
            }`}
          ></div>
          <div
            className={`bg-white h-[2px] w-5 rounded transform transition-all duration-300 ${
              isMenuOpen && 'translate-y-6 delay-75'
            }`}
          ></div>
          <div
            className={`bg-white h-[2px] w-5 transform transition-all duration-300 origin-left ${
              isMenuOpen && 'translate-y-6'
            }`}
          ></div>
        </div>
      </div>
    </button>
  )
}
