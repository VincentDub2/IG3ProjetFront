'use client';
//user Menu.tsx
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

import { useSession } from "next-auth/react";
import {Session} from "next-auth";

interface UserMenuProps {
  currentUser?: Session | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onOpenAboutUs = useCallback(() => {
    router.push('/aboutUs');
  }, []);

  const onClick = ( modal : () => void) => {
    toggleOpen();
    modal();
  }

  const onSignOut = () => {
    toggleOpen();
    signOut();
  }

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onOpenAboutUs}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Your health is our priority
        </div>
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My foods"
                  onClick={() => router.push('/myFood')}
                />
                <MenuItem 
                  label="Your account"
                  onClick={()=>router.push('/account')}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => onSignOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={() => onClick(loginModal.onOpen)}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={()=>onClick(registerModal.onOpen)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;