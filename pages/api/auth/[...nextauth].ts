import NextAuth, {AuthOptions, Profile, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from 'next-auth'

import axios from "axios";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb"

interface CustomUser extends User {
  sessionToken?: string
  accessToken?: string
  refreshToken?: string
}



export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize (credentials,req){

        const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials);
        const user = response.data;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      if (user) {
        token.user = {
          ...token,
          ...user,
          sessionToken: (user as any).sessionToken || account?.access_token,
          id: user.id,
          // ajoutez d'autres propriétés si elles existent sur `user`
        }
      }

      if (account) {
        token.account = {
          id: account.id,
          provider: account.provider,
          type: account.type,
          // add other properties if they exist on `account`
        }
      }
      console.log("token", token);
      return token;
    },
    async session({session, token, user}) {
      session.user = {
        ...session.user,
        sessionToken: (token as any).user.sessionToken,
        id: (token as any).user.id,
      }
      console.log("session", session);
      return session;
    },
  }, debug: process.env.NODE_ENV === 'development',
    pages: {
      signIn: '/',
    },
    session: {
  strategy: "jwt",
}, secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
