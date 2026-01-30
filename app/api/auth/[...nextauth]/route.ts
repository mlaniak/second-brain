import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Only allow these emails
const ALLOWED_EMAILS = [
  "mike.laniak@gmail.com",
]

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow whitelisted emails
      if (user.email && ALLOWED_EMAILS.includes(user.email)) {
        return true
      }
      return false
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }
