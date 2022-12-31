import { useSession } from 'next-auth/react'
import { Spinner } from '../../components/Spinner'

const Profile = () => {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') {
    return <Spinner />
  }

  return <h3>Holi {session?.user?.name}</h3>
}

export default Profile
