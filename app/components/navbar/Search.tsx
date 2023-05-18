'use client';

import {useRouter, useSearchParams} from "next/navigation";
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/app/hooks/useSearchModal';

import qs from "query-string";
import {tr} from "date-fns/locale";

interface SearchFormData {
  search: string;
}
const Search = () => {
  const {
    register,
        handleSubmit,
        formState: { errors },
  } = useForm<SearchFormData>();


  const searchModal = useSearchModal();

  const router = useRouter();
  const params = useSearchParams();

  //Permet de modifié l'url pour pouvoir plus recuper ce que l'utilisateur a tapé
  // Dans notre cas on recupere le terme de recherche dans searchModalFood
  const onSubmit = (data: SearchFormData) => {
    const url = qs.stringifyUrl({
      url: '/',
      query: { searchTerm: data.search },
    }, { skipNull: true });
    router.push(url);
    searchModal.onOpen();
  };

  return ( 
    <form
        onSubmit={handleSubmit(onSubmit)}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div //Div qui contient la barre de recherche
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <input // Permet de faire la barre de recherche mais elle invisible
            placeholder="Search..."
            {...register('search', { required: true })}
               className="rounded-full
               w-full
               md:w-auto
               bg-transparent
               border-none
               outline-none
               text-sm
               font-semibold
               px-6"
               />

        <div
          className="
            text-sm
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <div // Permet de faire le cercle avec la loupe
              onClick={handleSubmit(onSubmit)}
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </form>
  );
}
 
export default Search;