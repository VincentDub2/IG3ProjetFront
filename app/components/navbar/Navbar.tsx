'use client';
import { SafeUser } from "@/app/types";


import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "@/app/components/navbar/Categories";
import { useSession } from "next-auth/react";




const Navbar: React.FC = () => {
    const { data: session } = useSession();
  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <Search />
          <UserMenu currentUser={session} />
        </div>
      </Container>
    </div>
  </div>
  );
}


export default Navbar;