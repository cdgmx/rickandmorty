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
    <Grid container spacing={2} data-testid="character-list">
      {characters.map((character, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={index}
          data-testid={`character-item-${index}`}
        >
          <CharacterCard
            id={character.id || ''}
            data-testid="character-card"
            title={character.name || ''}
            image={character.image || ''}
            secondaryText={character.species || ''}
            description={character.status || ''}
            gender={character.gender || ''}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
