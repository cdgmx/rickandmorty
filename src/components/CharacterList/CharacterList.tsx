import React from 'react';
import { Grid } from '@mui/material';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
}) => {
  return (
    <Grid container spacing={2}>
      {characters.map((character, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CharacterCard
            id={character.id || ''}
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
