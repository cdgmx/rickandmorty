import React from 'react';
import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Skeleton,
} from '@mui/material';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
}

/**
 * @component CharacterListSkeleton
 * @description Renders a skeleton for Character cards.
 */
const CharacterListSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterListSkeleton;
