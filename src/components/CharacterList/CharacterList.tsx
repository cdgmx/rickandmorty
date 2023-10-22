import React, { useState, useEffect } from 'react';
import { Grid, Skeleton } from '@mui/material';
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
  const [skeletons, setSkeletons] = useState<number[]>([]);

  useEffect(() => {
    if (loading) {
      console.log('loading');
      // Append 8 new skeleton loaders when loading starts
      setSkeletons(prev => [
        ...prev,
        ...Array.from({ length: 8 }, (_, i) => i + prev.length),
      ]);
    } else {
      // Remove all skeleton loaders when loading is complete
      setSkeletons([]);
    }
  }, [loading]);

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
      {skeletons.map(index => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
