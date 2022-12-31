import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { firebaseConfig } from '../../../utils/firebaseConfig'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
}

export default NextAuth(authOptions)
