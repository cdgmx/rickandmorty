import recommendCharacters from './recommendCharacters';

describe('recommendCharacters Utility Function', () => {
  let characters;
  let currentCharacter;

  beforeEach(() => {
    // Initialize test data
    characters = [
      { id: 1, name: 'Rick', species: 'Human', origin: { id: 1 } },
      { id: 2, name: 'Morty', species: 'Human', origin: { id: 1 } },
      { id: 3, name: 'Birdperson', species: 'Bird', origin: { id: 2 } },
      { id: 4, name: 'Squanchy', species: 'Cat', origin: { id: 2 } },
    ];
  });

  it('should return an empty array if no current character is provided', () => {
    currentCharacter = null;
    const result = recommendCharacters(characters, currentCharacter);
    expect(result).toEqual([]);
  });

  it('should return an empty array if characters list is empty', () => {
    currentCharacter = {
      id: 1,
      name: 'Rick',
      species: 'Human',
      origin: { id: 1 },
    };
    const result = recommendCharacters([], currentCharacter);
    expect(result).toEqual([]);
  });

  it('should recommend characters of the same species', () => {
    currentCharacter = {
      id: 1,
      name: 'Rick',
      species: 'Human',
      origin: { id: 1 },
    };
    const result = recommendCharacters(characters, currentCharacter);
    expect(result).toContainEqual({
      id: 2,
      name: 'Morty',
      species: 'Human',
      origin: { id: 1 },
    });
  });

  it('should recommend characters from the same origin', () => {
    currentCharacter = {
      id: 3,
      name: 'Birdperson',
      species: 'Bird',
      origin: { id: 2 },
    };
    const result = recommendCharacters(characters, currentCharacter);
    expect(result).toContainEqual({
      id: 4,
      name: 'Squanchy',
      species: 'Cat',
      origin: { id: 2 },
    });
  });

  it('should not include the current character in the recommendations', () => {
    currentCharacter = {
      id: 1,
      name: 'Rick',
      species: 'Human',
      origin: { id: 1 },
    };
    const result = recommendCharacters(characters, currentCharacter);
    expect(result).not.toContainEqual(currentCharacter);
  });
});
