import React, { useState, useCallback, useEffect } from 'react';
import useFetch from '../useFetch';
import useInfiniteScroll from '../useInfiniteScroll';
import CharacterCard from '../CharacterCard/CharacterCard';
import { CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import SnackbarAlert from '../../CustomComponents/SnackbarAlert';
import CharacterDetailsDialog from '../CharacterDetailsDialog/CharacterDetailsDialog';
import debounce from 'lodash.debounce';
import './CharacterList.css';
import { PUBLIC_URL } from '../../../utils/api';
import SearchComponent from '../../CustomComponents/SearchComponent';
import FilterComponent from '../../CustomComponents/FilterComponent';

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    homeworld: '',
    film: '',
    species: '',
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetching data from the API
  const { data: { results = [], next }, loading, error } = useFetch(
    PUBLIC_URL,
    page,
    10
  );

  // Handle infinite scroll
  const fetchMoreData = useCallback(async () => {
    if (next) {
      setPage(prevPage => prevPage + 1);
    }
  }, [next]);

  const { isFetching } = useInfiniteScroll(fetchMoreData, !!error);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setSelectedCharacter(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (event) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterReset = () => {
    setSelectedFilters({
      homeworld: '',
      film: '',
      species: '',
    });
  };

  // Filtering data based on search query and filters
  const filteredResults = results
    .filter(character => character.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(character => {
      return (selectedFilters.homeworld ? character.homeworld === selectedFilters.homeworld : true) &&
        (selectedFilters.film ? character.films.includes(selectedFilters.film) : true) &&
        (selectedFilters.species ? character.species.includes(selectedFilters.species) : true);
    });

  // Show Snackbar when there's an error
  useEffect(() => {
    if (error) {
      setSnackbarMessage(`Error: ${error}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [error]);

  return (
    <div className="character-list">
      <SearchComponent onSearch={handleSearch} />
      <FilterComponent
        filters={selectedFilters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
      />

      {loading && <CircularProgress />}
      {filteredResults.map((character, index) => (
        <CharacterCard
          key={`${character.name}-${index}`} // Ensure unique key
          character={character}
          onClick={setSelectedCharacter}
        />
      ))}
      <CharacterDetailsDialog
        open={!!selectedCharacter}
        onClose={handleDialogClose}
        character={selectedCharacter}
      />
      <SnackbarAlert
        open={snackbarOpen}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CharacterList;
