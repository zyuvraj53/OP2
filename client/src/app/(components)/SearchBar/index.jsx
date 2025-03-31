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
        className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;