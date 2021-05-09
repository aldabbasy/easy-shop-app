import React from 'react';

type searchType = {
  query: string;
}

const initialData: searchType = {
  query: '',
};

const SearchContext = React.createContext(initialData);
export const SearchProvider = SearchContext.Provider;

export default SearchContext;
