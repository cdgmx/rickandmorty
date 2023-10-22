import React from 'react';
import { CircularProgress, Grid, Box, Typography } from '@mui/material';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';

/**
 * @component CharacterList
 * @description Renders a list of Character cards.
 * @param {Character[]} characters - Array of Character objects.
 */
const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  return (
    <Grid container spacing={2}>
      {characters.map((character, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CharacterCard
            title={character.name || ''}
            image={character.image || ''}
            secondaryText={character.species || ''}
            description={character.status || ''}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
