//layout.tsx
import { Nunito } from 'next/font/google'
import Provider from '@/app/providers/Provider';
import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import './globals.css'
import ClientOnly from './components/ClientOnly';
import SearchModalFood from "@/app/components/modals/SearchModalFood";
import AddProductModal from "@/app/components/modals/AddProductModal";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";



export const metadata = {
  title: 'EatTrack',
  description: 'Your health is our priority',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <Head>
                <link rel="icon" href="./WebSiteIcon.png" sizes="any" />
        </Head>

      <body className={font.className}>
        <Provider>
        <ClientOnly>
          <ToasterProvider />
          <SearchModalFood/>
          <LoginModal />
          <RegisterModal />
          <AddProductModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-36 pt-16">
          {children}
        </div>
        </Provider>
      </body>
    </html>
  )
}
