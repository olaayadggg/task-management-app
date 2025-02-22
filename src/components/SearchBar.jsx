import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={handleSearch}
      className="form-control mb-3"
    />
  );
};

export default SearchBar;