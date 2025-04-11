// components/SearchBar.tsx
import React, { ChangeEvent } from 'react';


const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleSearch = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="p-2.5 w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products by name..."
        className="w-full p-2 text-base bg-[#97571c7d] border border-gray-300 fo rounded focus:border-gray-600 placeholder-gray-800"
      />
    </div>
  );
};

export default SearchBar;