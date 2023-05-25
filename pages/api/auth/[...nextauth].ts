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

interface TokenData {
  user?: {
    sessionToken?: string;
    id?: string;
    // Autres propriétés si nécessaires
  };
  account?: {
    id?: string;
    provider?: string;
    type?: string;
    accessToken?: string;
    sessionToken?: string;
    // Autres propriétés si nécessaires
  };
  // Autres propriétés si nécessaires
}

interface SessionData {
  user?: {
    sessionToken?: string;
    id?: string;
    // Autres propriétés si nécessaires
  };
  // Autres propriétés si nécessaires
}


export const authOptions : NextAuthOptions = {
  providers: [
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
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.user = token as any;

        return session;
      },
  }, debug: process.env.NODE_ENV === 'development',
    pages: {
      signIn: '/',
    },
    session: {
  strategy: "jwt",
      maxAge: 3000,
}, secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
