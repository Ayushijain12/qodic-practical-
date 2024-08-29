// FilterComponent.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';

const FilterComponent = ({ filters, onFilterChange, onReset }) => {

  return (
    <Grid container spacing={2} className="filter-controls">
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Homeworld</InputLabel>
          <Select
            name="homeworld"
            value={filters.homeworld}
            onChange={onFilterChange}
            displayEmpty
          >
            <MenuItem value="Tatooine">Tatooine</MenuItem>
            <MenuItem value="Naboo">Naboo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Film</InputLabel>
          <Select
            name="film"
            value={filters.film}
            onChange={onFilterChange}
            displayEmpty
          >
            <MenuItem value="A New Hope">A New Hope</MenuItem>
            <MenuItem value="The Empire Strikes Back">The Empire Strikes Back</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select
            name="species"
            value={filters.species}
            onChange={onFilterChange}
            displayEmpty
          >
            <MenuItem value="Human">Human</MenuItem>
            <MenuItem value="Wookiee">Wookiee</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Button style={{ margin: '10px' }} variant="contained" onClick={onReset}>
          Reset Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
