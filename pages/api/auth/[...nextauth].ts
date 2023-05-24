import NextAuth, {AuthOptions, Profile, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from 'next-auth'

import axios from "axios";
import provider from "@/app/providers/Provider";
import Cookies from "js-cookie";
import {session} from "next-auth/core/routes";


interface CustomUser extends User {
  sessionToken?: string
}

export const authOptions : NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile, tokens) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
    }}),
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
    async jwt({token,user}){
      return {...token, ...user}
    },
    async session({session, token, user}){
      session.user=token as any;
      return session;
  },
    async signIn({user, account, profile}) {

      if (account?.provider === 'github' || account?.provider === 'google') {
        if (!account || !profile) {
          return false;
        }
        const customUser = user as CustomUser;
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/socialLog`, {
            id: account.userId,
            providerId: account.providerAccountId,
            name: profile.name,
            email: profile.email,
            image: profile.image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            provider: account.provider
          });

          if (response.data.account.access_token) {
            customUser.sessionToken = response.data.account.access_token;
            customUser.id=response.data.user.userId;
          }
          user.id=response.data.user.id;
          user.name=response.data.user.name;

          if (response.status === 200) {
              return true;
          }
          else {
            return false;
          }

        } catch (err) {
          console.error("Erreur lors de l'authentification sociale:", err);
          return false;
        }
      }
      return true;  // Ajoutez cette ligne
    },
},
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions);
