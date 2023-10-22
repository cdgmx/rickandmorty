import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';

describe('CharacterList', () => {
  const mockCharacters = [
    {
      id: '1',
      name: 'Rick',
      image: 'image_url_1',
      species: 'Human',
      status: 'Alive',
    },
    {
      id: '2',
      name: 'Morty',
      image: 'image_url_2',
      species: 'Human',
      status: 'Alive',
    },
  ];

  // Test coverage & Assertions
  it('should render character cards', () => {
    render(<CharacterList characters={mockCharacters} />);

    // Validate that the character list is rendered
    expect(screen.getByTestId('character-list')).toBeInTheDocument();

    mockCharacters.forEach((character, index) => {
      // Validate that each character item is rendered
      expect(screen.getByTestId(`character-item-${index}`)).toBeInTheDocument();
    });
  });

  // Test data edge case & Assertions
  it('should handle empty characters array', () => {
    render(<CharacterList characters={[]} />);
    expect(screen.getByTestId('character-list')).toBeInTheDocument();
    expect(screen.queryByTestId(/character-item-/)).not.toBeInTheDocument();
  });
});
