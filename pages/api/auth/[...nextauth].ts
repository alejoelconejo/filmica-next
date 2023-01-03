import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { firebaseConfig } from '../../../utils/firebaseConfig'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.id
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
