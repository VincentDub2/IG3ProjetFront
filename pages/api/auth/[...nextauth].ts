import NextAuth, {AuthOptions, Profile} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import axios from "axios";
import provider from "@/app/providers/Provider";

export default NextAuth({
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

        const response  = await axios.post('http://localhost:8080/auth/login', credentials);
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
      if (!token) {
       // session.user.sessionToken=user
      }
      session.user=token as any;
      return session;
  },
  async signIn({user, account, profile}) {
      console.log(user);
      if (account?.provider === 'github' || account?.provider === 'google') {
        if (!account || !profile) {
            return false
        }
        const response = await axios.post('http://localhost:8080/socialLog', {
          id: account.userId,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          provider: account.provider
        });
        // Vérifier la réponse du serveur ou effectuer d'autres actions nécessaires
        console.log(response.data);
        return true;
      }
      return true;
  },
    async redirect({url, baseUrl}) {
      return baseUrl
    }
},
  debug: process.env.NODE_ENV === 'development',
})

