import { createContext, useContext } from 'react';

interface SearchContextValue {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextValue>({
    searchTerm: '',
    setSearchTerm: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
