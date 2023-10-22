import applySorting from './applySorting';
import { SortConfig } from '@/components/SortingComponent';
import { Character } from '@/types';

describe('applySorting Utility Function', () => {
  let characters;
  let sortConfig;

  beforeEach(() => {
    // Initialize test data
    characters = [
      { id: 1, name: 'Rick', species: 'Human' },
      { id: 2, name: 'Morty', species: 'Human' },
      { id: 3, name: 'Birdperson', species: 'Bird' },
    ];
  });

  it('should return the same data if sortConfig is null', () => {
    sortConfig = null;
    const result = applySorting(characters, sortConfig);
    expect(result).toEqual(characters);
  });

  it('should sort by name in ascending order', () => {
    sortConfig = { key: 'name', direction: 'ascending' };
    const result = applySorting(characters, sortConfig);
    expect(result).toEqual([
      { id: 3, name: 'Birdperson', species: 'Bird' },
      { id: 2, name: 'Morty', species: 'Human' },
      { id: 1, name: 'Rick', species: 'Human' },
    ]);
  });

  it('should sort by name in descending order', () => {
    sortConfig = { key: 'name', direction: 'descending' };
    const result = applySorting(characters, sortConfig);
    expect(result).toEqual([
      { id: 1, name: 'Rick', species: 'Human' },
      { id: 2, name: 'Morty', species: 'Human' },
      { id: 3, name: 'Birdperson', species: 'Bird' },
    ]);
  });

  it('should sort by species in ascending order', () => {
    sortConfig = { key: 'species', direction: 'ascending' };
    const result = applySorting(characters, sortConfig);
    expect(result).toEqual([
      { id: 3, name: 'Birdperson', species: 'Bird' },
      { id: 1, name: 'Rick', species: 'Human' },
      { id: 2, name: 'Morty', species: 'Human' },
    ]);
  });

  it('should sort by species in descending order', () => {
    sortConfig = { key: 'species', direction: 'descending' };
    const result = applySorting(characters, sortConfig);
    expect(result).toEqual([
      { id: 1, name: 'Rick', species: 'Human' },
      { id: 2, name: 'Morty', species: 'Human' },
      { id: 3, name: 'Birdperson', species: 'Bird' },
    ]);
  });
});
