// CharacterList.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterList from './CharacterList';
import { PUBLIC_URL } from '../../../utils/api';

// Mock the useFetch hook to return some test data
jest.mock('../useFetch', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: {
      results: [
        {
          name: 'Luke Skywalker',
          homeworld: 'Tatooine',
          films: ['A New Hope'],
          species: ['Human']
        }
      ],
      next: null
    },
    loading: false,
    error: null
  }))
}));

// Mock the useInfiniteScroll hook
jest.mock('../useInfiniteScroll', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isFetching: false }))
}));

describe('CharacterList Component', () => {
  test('opens modal with correct character information when a CharacterCard is clicked', async () => {
    // Render the CharacterList component
    render(<CharacterList />);

    // Ensure CharacterCard is present
    const characterCard = screen.getByText('Luke Skywalker');
    expect(characterCard).toBeInTheDocument();

    // Click the CharacterCard to open the modal
    fireEvent.click(characterCard);

    // Wait for the modal to appear and verify its content
    const dialogTitle = await screen.findByText('Luke Skywalker');
    expect(dialogTitle).toBeInTheDocument();

    // You can also check for additional details in the modal if necessary
    // Example: Check if the character's homeworld is shown
    const homeworldDetail = screen.getByText('Homeworld: Tatooine');
    expect(homeworldDetail).toBeInTheDocument();
  });
});
