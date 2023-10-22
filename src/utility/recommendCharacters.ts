// utils/recommend.ts
import { Character } from '@/types';

/**
 * Recommends a list of characters based on a current character's attributes.
 *
 * @param characters - The list of all available characters.
 * @param currentCharacter - The current character being viewed.
 * @returns A filtered list of recommended characters.
 */
const recommendCharacters = (
  characters: Character[],
  currentCharacter: Character,
): Character[] => {
  if (!currentCharacter || !characters.length) return [];

  // Example: Recommend characters of the same species
  const bySpecies = characters.filter(
    character => character.species === currentCharacter.species,
  );

  // Example: Recommend characters from the same origin
  const byOrigin = characters.filter(
    character => character.origin?.id === currentCharacter.origin?.id,
  );

  // Merge and deduplicate recommendations
  const recommended = Array.from(new Set([...bySpecies, ...byOrigin]));

  // Remove the current character from the recommendations
  return recommended.filter(character => character.id !== currentCharacter.id);
};

export default recommendCharacters;
