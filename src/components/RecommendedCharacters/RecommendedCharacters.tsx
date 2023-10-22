import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Character } from '@/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper,
  List,
} from '@mui/material';

const CARD_MIN_WIDTH = 200;
const CARD_TRANSITION_DURATION = '0.3s';
const CARD_HOVER_BACKGROUND = 'rgba(0, 0, 0, 0.08)';
const CARD_HOVER_SCALE = 'scale(1.05)';
const CARD_IMAGE_HEIGHT = 140;

interface RecommendedCharactersProps {
  characters: Character[];
}

const RecommendedCharacters: React.FC<RecommendedCharactersProps> = ({
  characters,
}) => {
  const router = useRouter();

  const handleCardClick = useCallback(
    (id?: string) => {
      if (!id) return;
      router.push(`/characters/${id}`);
    },
    [router],
  );

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
          {characters.map(({ id, name, species, image }) => (
            <Card
              key={id}
              sx={{
                paddingVertical: 2,
                alignItems: 'start',
                minWidth: CARD_MIN_WIDTH,
                transition: CARD_TRANSITION_DURATION,
                '&:hover': {
                  backgroundColor: CARD_HOVER_BACKGROUND,
                  transform: CARD_HOVER_SCALE,
                },
              }}
            >
              <CardActionArea onClick={() => handleCardClick(id)}>
                <CardMedia
                  component="img"
                  height={CARD_IMAGE_HEIGHT}
                  image={image}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {species}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RecommendedCharacters;
