import { Dialog, Transition } from '@headlessui/react'
import { signIn } from 'next-auth/react'
import { Fragment } from 'react'

interface Props {
  isOpen: boolean
  toggleOpen: () => void
}

export function DialogSignIn({ isOpen, toggleOpen }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => toggleOpen()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center text-lg'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all '>
                <Dialog.Description className='mb-8 text-center'>
                  You must sign in to add items to your favorites
                </Dialog.Description>
                <div className='flex gap-8 justify-center'>
                  <button
                    className='px-4 py-2 border border-neutral-700 rounded bg-violet-900 hover:bg-violet-700 transition'
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                  <button
                    className='px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-800 transition'
                    onClick={() => toggleOpen()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
