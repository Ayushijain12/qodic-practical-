import React from 'react';
import { useTheme } from '../../ThemeContext-temp'; // Adjust the path as needed
import './CharacterCard.css';

const CharacterCard = ({ character, onClick }) => {
  const { darkMode } = useTheme();

  console.log('character', character);

  return (
    <div className={`character-card ${darkMode ? 'dark-mode' : 'light-mode'}`} onClick={() => onClick(character)}>
      <img src={character.imageUrl} alt={character.name} className="character-image" />
      <h2>{character.name}</h2>
      {/* Other character details */}
    </div>
  );
};

export default CharacterCard;
