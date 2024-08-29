// SearchComponent.js
import React from 'react';
import { TextField } from '@mui/material';
import debounce from 'lodash.debounce';

const SearchComponent = ({ onSearch }) => {
  // Debounce the search input to limit search operations
  const debouncedSearch = React.useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <TextField
      label="Search Characters"
      variant="outlined"
      onChange={handleSearchChange}
      fullWidth
    />
  );
};

export default SearchComponent;
