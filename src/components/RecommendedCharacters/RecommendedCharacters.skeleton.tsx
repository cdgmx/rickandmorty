import React from 'react';
import { Card, CardContent, Box, Paper, List, Skeleton } from '@mui/material';

const CARD_MIN_WIDTH = 200;
const CARD_IMAGE_HEIGHT = 140;

interface RecommendedCharactersSkeletonProps {
  count?: number;
}

const RecommendedCharactersSkeleton: React.FC<
  RecommendedCharactersSkeletonProps
> = ({
  count = 5, // default to 5 skeleton cards
}) => {
  return (
    <Paper elevation={3}>
      <Box sx={{ display: 'flex', overflowX: 'auto' }}>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: 'fit-content',
            gap: 2,
            padding: 2,
          }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <Card key={index} sx={{ minWidth: CARD_MIN_WIDTH }}>
              <Skeleton variant="rectangular" height={CARD_IMAGE_HEIGHT} />
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
              </CardContent>
            </Card>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RecommendedCharactersSkeleton;
