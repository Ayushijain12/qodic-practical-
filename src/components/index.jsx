import React from 'react';
import { ThemeProvider } from './ThemeContext-temp';
import Header from './Header';
import CharacterList from './CharacterListComponents/CharacterList/CharacterList'; // Assuming this is your main component
import './styles.css';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <CharacterList />
    </ThemeProvider>
  );
};

export default App;
