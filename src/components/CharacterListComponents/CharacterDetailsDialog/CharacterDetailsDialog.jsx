import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, Grid, Divider } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useTheme } from '../../ThemeContext-temp'; // Import the ThemeContext hook
import './CharacterDetailsDialog.css'; // Import CSS file

const CharacterDetailsDialog = ({ open, onClose, character }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme(); // Get current theme

  useEffect(() => {
    if (character && character.homeworld) {
      const fetchHomeworld = async () => {
        setLoading(true);
        try {
          const response = await axios.get(character.homeworld);
          setHomeworld(response.data);
        } catch (error) {
          console.error('Failed to fetch homeworld:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchHomeworld();
    }
  }, [character]);

  if (!character) return null;

  const dateAdded = dayjs().format('DD-MM-YYYY'); // Example date added

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className={darkMode ? 'dark-mode' : 'light-mode'}>
      <DialogTitle className="dialog-title">
        {character.name}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>
              Character Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1"><strong>Height:</strong> {character.height} meters</Typography>
                <Typography variant="body1"><strong>Mass:</strong> {character.mass} kg</Typography>
                <Typography variant="body1"><strong>Date Added:</strong> {dateAdded}</Typography>
                <Typography variant="body1"><strong>Number of Films:</strong> {character.films.length}</Typography>
                <Typography variant="body1"><strong>Birth Year:</strong> {character.birth_year}</Typography>
              </Grid>
              {homeworld && (
                <Grid item xs={12} md={6}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="h6">Homeworld</Typography>
                  <Typography variant="body1"><strong>Name:</strong> {homeworld.name}</Typography>
                  <Typography variant="body1"><strong>Terrain:</strong> {homeworld.terrain}</Typography>
                  <Typography variant="body1"><strong>Climate:</strong> {homeworld.climate}</Typography>
                  <Typography variant="body1"><strong>Population:</strong> {homeworld.population}</Typography>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterDetailsDialog;
